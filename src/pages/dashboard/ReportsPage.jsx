import { Link } from 'react-router-dom';
import { Search, X, AlertCircle, ShieldAlert, Eye, Plus } from 'lucide-react';
import useReportStore from '../../store/useReportStore';
import { incidentTypes } from '../../data/mockData';

export default function ReportsPage() {
  const filters = useReportStore((state) => state.filters);
  const setFilter = useReportStore((state) => state.setFilter);
  const resetFilters = useReportStore((state) => state.resetFilters);
  const getFilteredReports = useReportStore((state) => state.getFilteredReports);

  const filteredReports = getFilteredReports();

  const handleSearchChange = (e) => {
    setFilter('search', e.target.value);
  };

  const handleSelectFilter = (key, value) => {
    setFilter(key, value);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Assigned':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'Low':
        return 'bg-gray-100 text-gray-850';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Critical':
        return 'bg-red-105 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const hasActiveFilters =
    filters.search !== '' ||
    filters.status !== 'All' ||
    filters.type !== 'All' ||
    filters.severity !== 'All';

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-pnp-navy">
            Incident Database
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Search, filter, and review incident reports submitted by citizens of Rodriguez, Rizal.
          </p>
        </div>
        <div className="flex gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Filter panel */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ID, desc, barangay..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy transition-all"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filters.status}
              onChange={(e) => handleSelectFilter('status', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy transition-all text-gray-750"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filters.type}
              onChange={(e) => handleSelectFilter('type', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy transition-all text-gray-750"
            >
              <option value="All">All Incident Types</option>
              {incidentTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <select
              value={filters.severity}
              onChange={(e) => handleSelectFilter('severity', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy transition-all text-gray-750"
            >
              <option value="All">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table Card */}
      <div className="bg-white rounded-2xl border border-gray-250/70 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-150 flex items-center justify-between bg-gray-50/50">
          <span className="text-xs font-bold text-pnp-navy uppercase tracking-wider">
            Reports Listing ({filteredReports.length})
          </span>
        </div>

        {filteredReports.length === 0 ? (
          <div className="p-16 text-center">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800">No Reports Found</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto leading-relaxed">
              No incidents match your current search terms or filter selection. Try clearing filters to reset.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">
                  <th className="px-6 py-3.5">Report ID</th>
                  <th className="px-6 py-3.5">Incident Type</th>
                  <th className="px-6 py-3.5">Barangay</th>
                  <th className="px-6 py-3.5">Severity</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Assigned Officer</th>
                  <th className="px-6 py-3.5">Date Submitted</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-xs text-gray-600">
                      {report.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {report.type}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {report.barangay}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getSeverityClass(
                          report.severity
                        )}`}
                      >
                        {report.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusClass(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {report.assignedOfficer || (
                        <span className="text-gray-400 text-xs italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {formatDate(report.dateSubmitted)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/dashboard/reports/${report.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pnp-navy hover:bg-pnp-navy-light text-white text-xs font-semibold rounded transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
