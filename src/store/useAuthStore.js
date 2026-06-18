import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (email, password) => {
    // Mock login - accepts any credentials for demo
    const mockUser = {
      uid: 'USR-DESK-001',
      name: 'Desk Officer Martinez',
      email: email,
      role: 'desk_officer',
      station: 'Montalban Police Station',
    };
    set({ user: mockUser, isAuthenticated: true });
    return true;
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
