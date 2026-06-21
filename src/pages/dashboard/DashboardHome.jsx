import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Plus,
  Megaphone,
  HelpCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Import leaflet icons for marker fix in Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import useReportStore from '../../store/useReportStore';
import { monthlyReportData } from '../../data/mockData';

// Fix Leaflet marker icon issue
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function DashboardHome() {
  const reports = useReportStore((state) => state.reports);

  // Status Counts
  const total = reports.length;
  const pending = reports.filter((r) => r.status === 'Pending').length;
  const assigned = reports.filter((r) => r.status === 'Assigned').length;
  const inProgress = reports.filter((r) => r.status === 'In Progress').length;
  const resolved = reports.filter((r) => r.status === 'Resolved').length;

  const activeReportsCount = pending + assigned + inProgress;

  // Recent 5 reports
  const recentReports = [...reports]
    .sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted))
    .slice(0, 5);

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
        return 'bg-gray-100 text-gray-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-orange-150 text-orange-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationClass = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'hoax':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      default:
        return 'bg-gray-50 text-gray-500 border border-gray-200';
    }
  };

  const getVerificationIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />;
      case 'hoax':
        return <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />;
      default:
        return <HelpCircle className="w-3 h-3 text-gray-400 shrink-0" />;
    }
  };

  const getVerificationLabel = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified Real';
      case 'hoax':
        return 'Hoax / Fake';
      default:
        return 'Unverified';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-pnp-navy">
            Welcome back, Officer!
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Here is what's happening in Rodriguez (Montalban), Rizal today.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            to="/dashboard/reports"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-pnp-navy hover:bg-pnp-navy-light text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            New Report
          </Link>
          <Link
            to="/dashboard/announcements"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-pnp-gold hover:bg-pnp-gold-dark text-pnp-navy text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Megaphone className="w-3.5 h-3.5" />
            Post Update
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white p-5 rounded-2xl border border-gray-250/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-pnp-navy/5 text-pnp-navy flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Total Reports
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{total}</p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-5 rounded-2xl border border-gray-250/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Pending
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{pending}</p>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white p-5 rounded-2xl border border-gray-250/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              In Progress
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {inProgress + assigned}
            </p>
          </div>
        </div>

        {/* Resolved */}
        <div className="bg-white p-5 rounded-2xl border border-gray-250/70 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Resolved
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{resolved}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Incident Map Box */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-250/70 shadow-sm overflow-hidden flex flex-col h-[480px]">
          <div className="p-5 border-b border-gray-150 flex items-center justify-between">
            <h3 className="font-bold text-pnp-navy flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pnp-gold" />
              Incident Map Pinned Locations
            </h3>
            <span className="px-2 py-0.5 bg-pnp-navy/5 text-pnp-navy text-[10px] font-bold rounded">
              {activeReportsCount} Active Incidents
            </span>
          </div>

          <div className="flex-1 relative">
            <MapContainer
              center={[14.7382, 121.1170]} // Montalban Police Station coord
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {reports
                .filter((r) => r.latitude && r.longitude)
                .map((report) => (
                  <Marker
                    key={report.id}
                    position={[report.latitude, report.longitude]}
                  >
                    <Popup className="custom-popup">
                      <div className="p-1 space-y-1.5 max-w-xs">
                        <div className="flex items-center justify-between gap-3 border-b pb-1">
                          <span className="font-mono text-xs font-bold text-pnp-navy">
                            {report.id}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${getStatusClass(
                              report.status
                            )}`}
                          >
                            {report.status}
                          </span>
                        </div>
                        <p className="font-bold text-xs text-gray-900">
                          {report.type}
                        </p>
                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                          {report.description}
                        </p>
                        <div className="flex items-center justify-between pt-1 border-t text-[10px] text-gray-400">
                          <span>{report.barangay}</span>
                          <Link
                            to={`/dashboard/reports/${report.id}`}
                            className="font-bold text-pnp-navy hover:text-pnp-blue"
                          >
                            View Details &rarr;
                          </Link>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>

        {/* Quick Stats / Recharts Column */}
        <div className="bg-white rounded-2xl border border-gray-250/70 shadow-sm p-5 flex flex-col h-[480px]">
          <h3 className="font-bold text-pnp-navy mb-4">Monthly Report Trends</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyReportData}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} style={{ fontSize: 11 }} />
                <YAxis tickLine={false} style={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0D1B4C',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="reports" fill="#D4A843" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Quick Info Box */}
          <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-150 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-pnp-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-pnp-navy uppercase tracking-wider">
                System Advisory
              </h4>
              <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                Rainy season is causing a 15% increase in road incidents and flood complaints in low-lying areas. Keep patrol officers alerted.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Incident Reports Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-150 flex items-center justify-between">
          <h3 className="font-bold text-pnp-navy">Recent Reports</h3>
          <Link
            to="/dashboard/reports"
            className="text-xs font-bold text-pnp-navy hover:text-pnp-gold transition-colors"
          >
            View All Reports &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-3.5">Report ID</th>
                <th className="px-6 py-3.5">Incident Type</th>
                <th className="px-6 py-3.5">Barangay</th>
                <th className="px-6 py-3.5">Severity</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Verification</th>
                <th className="px-6 py-3.5">Date Submitted</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {recentReports.map((report) => (
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
                  <td className="px-6 py-4 text-gray-500">{report.barangay}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getSeverityClass(
                        report.severity
                      )}`}
                    >
                      {report.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusClass(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getVerificationClass(
                        report.verificationStatus
                      )}`}
                    >
                      {getVerificationIcon(report.verificationStatus)}
                      {getVerificationLabel(report.verificationStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {formatDate(report.dateSubmitted)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/dashboard/reports/${report.id}`}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-pnp-navy hover:text-white text-gray-600 text-xs font-semibold rounded transition-colors"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
