import { create } from 'zustand';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase/config';
import { mockAnnouncements } from '../data/mockData';

const useAnnouncementStore = create((set) => {
  // Listen to Firebase Realtime Database
  try {
    const announcementsRef = ref(database, 'announcements');
    onValue(announcementsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object-map from Firebase to sorted array list
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => {
          const dateA = a.datePublished ? new Date(a.datePublished) : 0;
          const dateB = b.datePublished ? new Date(b.datePublished) : 0;
          return dateB - dateA;
        });
        
        set({ announcements: list });
      } else {
        set({ announcements: mockAnnouncements });
      }
    }, (error) => {
      console.warn("Firebase read error, using mock data:", error);
      set({ announcements: mockAnnouncements });
    });
  } catch (err) {
    console.warn("Firebase not initialized or configured, using mock data:", err);
    set({ announcements: mockAnnouncements });
  }

  return {
    announcements: mockAnnouncements,
  };
});

export default useAnnouncementStore;
