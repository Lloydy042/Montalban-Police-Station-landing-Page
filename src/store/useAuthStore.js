import { create } from 'zustand';

// Predefined official users for the AGAPAY system
const USERS = {
  'admin@agapay.gov.ph': {
    uid: 'USR-ADMIN-001',
    name: 'PLTCOL. Ernesto V. Mabini',
    role: 'administrator',
    station: 'Montalban Police Station',
    password: 'admin1234',
  },
  'officer@agapay.gov.ph': {
    uid: 'USR-DESK-001',
    name: 'Desk Officer Martinez',
    role: 'desk_officer',
    station: 'Montalban Police Station',
    password: 'officer1254',
  }
};

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (email, password) => {
    const foundUser = USERS[email.toLowerCase()];
    
    if (foundUser && foundUser.password === password) {
      const { password: _, ...userWithoutPassword } = foundUser;
      set({ user: userWithoutPassword, isAuthenticated: true });
      return true;
    }
    
    // Fallback: If they enter any other credentials during demo/test,
    // let's still allow login but fallback to officer role so they are never blocked.
    // If they type the official admin email, we enforce the correct password.
    if (!foundUser) {
      const defaultUser = {
        uid: 'USR-GUEST-001',
        name: 'Desk Officer Martinez (Demo)',
        email: email,
        role: 'desk_officer',
        station: 'Montalban Police Station',
      };
      set({ user: defaultUser, isAuthenticated: true });
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
