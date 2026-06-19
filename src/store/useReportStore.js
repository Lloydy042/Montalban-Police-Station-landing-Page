import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockReports } from '../data/mockData';

const useReportStore = create(
  persist(
    (set, get) => ({
      reports: mockReports,
      filters: {
        search: '',
        status: 'All',
        type: 'All',
        severity: 'All',
      },
      
      setFilter: (key, value) => {
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        }));
      },
      
      resetFilters: () => {
        set({
          filters: { search: '', status: 'All', type: 'All', severity: 'All' },
        });
      },
      
      getFilteredReports: () => {
        const { reports, filters } = get();
        return reports.filter((report) => {
          const matchSearch = filters.search === '' || 
            report.id.toLowerCase().includes(filters.search.toLowerCase()) ||
            report.description.toLowerCase().includes(filters.search.toLowerCase()) ||
            report.barangay.toLowerCase().includes(filters.search.toLowerCase()) ||
            report.type.toLowerCase().includes(filters.search.toLowerCase());
          const matchStatus = filters.status === 'All' || report.status === filters.status;
          const matchType = filters.type === 'All' || report.type === filters.type;
          const matchSeverity = filters.severity === 'All' || report.severity === filters.severity;
          return matchSearch && matchStatus && matchType && matchSeverity;
        });
      },
      
      updateReportStatus: (reportId, newStatus) => {
        set((state) => ({
          reports: state.reports.map((r) =>
            r.id === reportId ? { ...r, status: newStatus } : r
          ),
        }));
      },
      
      assignOfficer: (reportId, officerName) => {
        set((state) => ({
          reports: state.reports.map((r) =>
            r.id === reportId ? { ...r, assignedOfficer: officerName, status: 'Assigned' } : r
          ),
        }));
      },
    }),
    {
      name: 'agapay-reports',
      // Only persist the reports array, not the filters
      partialize: (state) => ({ reports: state.reports }),
    }
  )
);

export default useReportStore;
