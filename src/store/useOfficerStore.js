import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockOfficers } from '../data/mockData';

const useOfficerStore = create(
  persist(
    (set, get) => ({
      officers: mockOfficers,

      addOfficer: (officer) => {
        const id = `OFF-${String(get().officers.length + 1).padStart(3, '0')}`;
        const newOfficer = {
          ...officer,
          id,
          currentAssignment: null,
        };
        set((state) => ({
          officers: [...state.officers, newOfficer],
        }));
      },

      updateOfficerStatus: (id, status) => {
        set((state) => ({
          officers: state.officers.map((off) =>
            off.id === id ? { ...off, status } : off
          ),
        }));
      },

      deleteOfficer: (id) => {
        set((state) => ({
          officers: state.officers.filter((off) => off.id !== id),
        }));
      },
    }),
    {
      name: 'agapay-officers',
    }
  )
);

export default useOfficerStore;
