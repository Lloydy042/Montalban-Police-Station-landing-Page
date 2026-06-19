import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockAnnouncements } from '../data/mockData';

const useAnnouncementStore = create(
  persist(
    (set, get) => ({
      announcements: mockAnnouncements,

      addAnnouncement: (announcement) => {
        const id = `ANN-${String(get().announcements.length + 1).padStart(3, '0')}`;
        const newAnnouncement = {
          ...announcement,
          id,
          datePublished: announcement.is_published ? new Date().toISOString() : null,
        };
        set((state) => ({
          announcements: [newAnnouncement, ...state.announcements],
        }));
      },

      updateAnnouncement: (id, updatedFields) => {
        set((state) => ({
          announcements: state.announcements.map((ann) =>
            ann.id === id
              ? {
                  ...ann,
                  ...updatedFields,
                  datePublished:
                    updatedFields.is_published !== undefined
                      ? (updatedFields.is_published ? ann.datePublished || new Date().toISOString() : null)
                      : ann.datePublished,
                }
              : ann
          ),
        }));
      },

      deleteAnnouncement: (id) => {
        set((state) => ({
          announcements: state.announcements.filter((ann) => ann.id !== id),
        }));
      },

      togglePublish: (id) => {
        set((state) => ({
          announcements: state.announcements.map((ann) => {
            if (ann.id === id) {
              const is_published = !ann.is_published;
              return {
                ...ann,
                is_published,
                datePublished: is_published ? ann.datePublished || new Date().toISOString() : null,
              };
            }
            return ann;
          }),
        }));
      },
    }),
    {
      name: 'agapay-announcements',
    }
  )
);

export default useAnnouncementStore;
