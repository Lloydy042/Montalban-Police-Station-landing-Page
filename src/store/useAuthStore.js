import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// SHA-256 hashing utility using native browser Web Crypto API
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);                    
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));                  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Predefined official users for the AGAPAY system with SHA-256 hashed passwords
// admin@agapay.gov.ph / password hash of 'admin1234'
// officer@agapay.gov.ph / password hash of 'officer1254'
const USERS = {
  'admin@agapay.gov.ph': {
    uid: 'USR-ADMIN-001',
    name: 'PLTCOL. Ernesto V. Mabini',
    email: 'admin@agapay.gov.ph',
    role: 'administrator',
    station: 'Montalban Police Station',
    passwordHash: 'ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270',
  },
  'officer@agapay.gov.ph': {
    uid: 'USR-DESK-001',
    name: 'Desk Officer Martinez',
    email: 'officer@agapay.gov.ph',
    role: 'desk_officer',
    station: 'Montalban Police Station',
    passwordHash: '2376c1f5ae2597546cd751a737aeb63c5b23163d634c31319ba98c9acc3e7cbd',
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      failedAttempts: 0,
      lockoutUntil: null,
      securityLogs: [],
      
      login: async (email, password) => {
        // 1. Check lockout status
        const now = Date.now();
        const lockoutUntil = get().lockoutUntil;
        if (lockoutUntil && now < lockoutUntil) {
          const timeRemaining = Math.ceil((lockoutUntil - now) / 1000);
          return { success: false, reason: 'locked_out', timeRemaining };
        }
        
        const lowercaseEmail = email.toLowerCase();
        const foundUser = USERS[lowercaseEmail];
        
        // 2. Perform SHA-256 hashing
        const passwordHash = await sha256(password);
        
        if (foundUser && foundUser.passwordHash === passwordHash) {
          // Success
          const { passwordHash: _, ...userWithoutPassword } = foundUser;
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true, 
            failedAttempts: 0, 
            lockoutUntil: null 
          });
          
          get().logAuditEvent('Logon Successful', lowercaseEmail);
          return { success: true };
        }
        
        // 3. Fallback/Guest logic during demo:
        // If they enter any custom email (to allow easy testing), hash and accept
        // but restrict if they typed the official admin email with wrong credentials.
        if (!foundUser && !lowercaseEmail.includes('agapay.gov.ph')) {
          const defaultUser = {
            uid: 'USR-GUEST-001',
            name: 'Desk Officer Martinez (Demo)',
            email: email,
            role: 'desk_officer',
            station: 'Montalban Police Station',
          };
          set({ user: defaultUser, isAuthenticated: true, failedAttempts: 0, lockoutUntil: null });
          get().logAuditEvent('Demo Guest Logon Successful', lowercaseEmail);
          return { success: true };
        }
        
        // 4. Failed Attempt handling & lockout calculation
        const nextFailedAttempts = get().failedAttempts + 1;
        let nextLockoutUntil = null;
        let reason = 'invalid_credentials';
        let timeRemaining = 0;
        
        if (nextFailedAttempts >= 3) {
          nextLockoutUntil = Date.now() + 30 * 1000; // 30 seconds lockout
          timeRemaining = 30;
          reason = 'locked_out';
          set({ failedAttempts: nextFailedAttempts, lockoutUntil: nextLockoutUntil });
          get().logAuditEvent('Account Locked Out (Brute Force Limit)', lowercaseEmail);
        } else {
          set({ failedAttempts: nextFailedAttempts });
          get().logAuditEvent('Logon Failed (Invalid Credentials)', lowercaseEmail);
        }
        
        return { success: false, reason, timeRemaining };
      },
      
      logout: () => {
        const user = get().user;
        if (user) {
          get().logAuditEvent('Logoff Action', user.email || 'Admin');
        }
        set({ user: null, isAuthenticated: false });
      },

      logAuditEvent: (action, userEmail) => {
        const newLog = {
          id: `SEC-LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          action,
          user: userEmail,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({
          securityLogs: [newLog, ...(state.securityLogs || [])].slice(0, 50),
        }));
      }
    }),
    {
      name: 'agapay-auth',
      partialize: (state) => ({ 
        failedAttempts: state.failedAttempts,
        lockoutUntil: state.lockoutUntil,
        securityLogs: state.securityLogs
      })
    }
  )
);

export default useAuthStore;
