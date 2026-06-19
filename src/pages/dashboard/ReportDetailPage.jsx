import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  User,
  Phone,
  MapPin,
  ShieldAlert,
  UserCheck,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Import leaflet icons for marker fix in Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import useReportStore from '../../store/useReportStore';
import useOfficerStore from '../../store/useOfficerStore';

// Fix Leaflet marker icon issue
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function ReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const reports = useReportStore((state) => state.reports);
  const updateReportStatus = useReportStore((state) => state.updateReportStatus);
  const assignOfficer = useReportStore((state) => state.assignOfficer);
  const officers = useOfficerStore((state) => state.officers);

  const report = reports.find((r) => r.id === id);

  const [selectedOfficer, setSelectedOfficer] = useState(
    report?.assignedOfficer || ''
  );
  const [selectedStatus, setSelectedStatus] = useState(
    report?.status || 'Pending'
  );
  const [timelineNotes, setTimelineNotes] = useState('');

  // Setup audit log state for demonstration purposes
  const [auditLog, setAuditLog] = useState([
    {
      action: 'Report Submitted',
      officer: 'System',
      date: report?.dateSubmitted ? new Date(report.dateSubmitted).toISOString() : new Date().toISOString(),
      note: `Report submitted via citizens mobile app (${report?.channel || 'app'}).`,
    },
    ...(report?.assignedOfficer
      ? [
          {
            action: 'Officer Assigned',
            officer: 'Desk Officer',
            date: new Date(new Date(report.dateSubmitted).getTime() + 15 * 60 * 1000).toISOString(),
            note: `PO Officer ${report.assignedOfficer} dispatched to investigate the report.`,
          },
        ]
      : []),
    ...(report?.status === 'In Progress'
      ? [
          {
            action: 'Status Updated to In Progress',
            officer: report.assignedOfficer || 'Field Officer',
            date: new Date(new Date(report.dateSubmitted).getTime() + 30 * 60 * 1000).toISOString(),
            note: 'Officer arrived at the location and commenced active police operations.',
          },
        ]
      : []),
    ...(report?.status === 'Resolved'
      ? [
          {
            action: 'Status Updated to In Progress',
            officer: report.assignedOfficer || 'Field Officer',
            date: new Date(new Date(report.dateSubmitted).getTime() + 30 * 60 * 1000).toISOString(),
            note: 'Investigation commenced.',
          },
          {
            action: 'Case Resolved',
            officer: report.assignedOfficer || 'Field Officer',
            date: new Date(new Date(report.dateSubmitted).getTime() + 2 * 60 * 60 * 1000).toISOString(),
            note: 'Case resolved. Incident report completed and cleared.',
          },
        ]
      : []),
  ]);

  if (!report) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900">Incident Report Not Found</h3>
        <p className="text-gray-500 text-sm mt-1 mb-6">
          The report ID <span className="font-mono font-bold">{id}</span> does not exist in our database.
        </p>
        <Link
          to="/dashboard/reports"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-pnp-navy text-white text-xs font-semibold rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Database
        </Link>
      </div>
    );
  }

  const handleUpdate = () => {
    // Save details
    if (selectedOfficer !== report.assignedOfficer) {
      assignOfficer(report.id, selectedOfficer);
      // Append audit
      setAuditLog((prev) => [
        ...prev,
        {
          action: 'Officer Assigned',
          officer: 'Desk Officer',
          date: new Date().toISOString(),
          note: `Officer assigned: ${selectedOfficer}. ${timelineNotes}`,
        },
      ]);
    }

    if (selectedStatus !== report.status) {
      updateReportStatus(report.id, selectedStatus);
      setAuditLog((prev) => [
        ...prev,
        {
          action: `Status Updated to ${selectedStatus}`,
          officer: selectedOfficer || 'Desk Officer',
          date: new Date().toISOString(),
          note: timelineNotes || `Status transitioned from ${report.status} to ${selectedStatus}.`,
        },
      ]);
    }

    setTimelineNotes('');
    alert('Incident report successfully updated!');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'Assigned':
        return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'In Progress':
        return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'Resolved':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-650" />;
    }
  };

  const getStatusColor = (status) => {
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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-orange-100 text-orange-850';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-150 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigation & Title */}
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard/reports"
          className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-bold text-gray-500">
              {report.id}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getSeverityColor(
                report.severity
              )}`}
            >
              {report.severity} Severity
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(
                report.status
              )}`}
            >
              {report.status}
            </span>
          </div>
          <h2 className="text-xl font-bold text-pnp-navy mt-1">
            {report.type} at Brgy. {report.barangay}
          </h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Detailed Information */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main info card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-pnp-navy pb-2 border-b border-gray-100 mb-3">
                Incident Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-150">
                {report.description}
              </p>
            </div>

            {/* Reporter details */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-pnp-navy pb-2 border-b border-gray-100 mb-3">
                  Reporter Information
                </h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <User className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>
                      {report.anonymous ? (
                        <span className="text-gray-400 italic">Anonymous Reporter</span>
                      ) : (
                        report.reporterName
                      )}
                    </span>
                  </div>
                  {report.reporterContact && (
                    <div className="flex items-center gap-2.5 text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-mono text-xs">
                        {report.reporterContact}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5 text-gray-400 text-xs">
                    <span>
                      Submitted via: {report.channel === 'app' ? 'AGAPAY App' : 'Web Portal'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-pnp-navy pb-2 border-b border-gray-100 mb-3">
                  Time & Date
                </h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>Submitted: {formatDate(report.dateSubmitted)}</span>
                  </div>
                  {report.assignedOfficer && (
                    <div className="flex items-center gap-2.5 text-gray-600">
                      <UserCheck className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>Assigned: {report.assignedOfficer}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Photos section */}
            {report.photos && report.photos.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-pnp-navy pb-2 border-b border-gray-100 mb-3">
                  Attached Photo Evidence
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {report.photos.map((photo, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-250/70 relative flex flex-col items-center justify-center text-center text-xs text-gray-400"
                    >
                      <span className="font-bold text-[10px] text-pnp-navy">
                        PHOTO_EVIDENCE_{i + 1}
                      </span>
                      <span className="text-[9px] text-gray-500 mt-1">
                        JPEG File Format
                      </span>
                      {/* Map-style visual representing attachment */}
                      <div className="absolute inset-x-0 bottom-0 py-1 bg-black/5 border-t text-[9px] text-gray-400 font-mono">
                        {photo}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Leaflet GPS map card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-80">
            <div className="p-4 border-b border-gray-150 flex items-center justify-between">
              <span className="text-xs font-bold text-pnp-navy uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-pnp-gold" />
                GPS Incident Coordinates
              </span>
              <span className="font-mono text-xs text-gray-400">
                Lat: {report.latitude}, Lng: {report.longitude}
              </span>
            </div>
            <div className="flex-1 relative bg-gray-50">
              <MapContainer
                center={[report.latitude, report.longitude]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[report.latitude, report.longitude]}>
                  <Popup>
                    <div className="text-xs">
                      <span className="font-bold">{report.type}</span> <br />
                      Brgy. {report.barangay}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Case Timeline / Audit Log */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-pnp-navy pb-2 border-b border-gray-100 mb-6 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-pnp-gold" />
              Incident Audit Timeline & Case Logs
            </h3>

            <div className="relative border-l-2 border-gray-200 ml-3 space-y-6 py-1">
              {auditLog.map((log, index) => (
                <div key={index} className="relative pl-6">
                  {/* Timeline dot */}
                  <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-pnp-navy border-2 border-white ring-4 ring-pnp-navy/10" />

                  <div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {formatDate(log.date)}
                    </span>
                    <h4 className="text-sm font-bold text-pnp-navy mt-0.5">
                      {log.action}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{log.note}</p>
                    <div className="text-[10px] text-gray-400 mt-1 italic font-medium">
                      By: {log.officer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Actions Panel */}
        <div className="lg:col-span-4 space-y-6">
          {/* Dispatch & status card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-pnp-navy pb-2 border-b border-gray-100">
              Case Coordination
            </h3>

            {/* Officer assignment selection */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Assign Police Officer
              </label>
              <select
                value={selectedOfficer}
                onChange={(e) => setSelectedOfficer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy text-gray-700 bg-gray-50"
              >
                <option value="">-- Select Field Officer --</option>
                {officers.map((o) => (
                  <option key={o.id} value={o.name}>
                    {o.name} ({o.rank}) — {o.status}
                  </option>
                ))}
              </select>
            </div>

            {/* Status updates */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Set Report Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Pending', 'Assigned', 'In Progress', 'Resolved'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedStatus(st)}
                    className={`py-2 px-3 border rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      selectedStatus === st
                        ? 'bg-pnp-navy text-white border-pnp-navy shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {getStatusIcon(st)}
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Audit log note input */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Action Notes / Remarks
              </label>
              <textarea
                value={timelineNotes}
                onChange={(e) => setTimelineNotes(e.target.value)}
                placeholder="Include dispatch coordinates, details of resolution, or officer notes..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy text-gray-700 bg-gray-50 resize-none"
              />
            </div>

            {/* Submit Update */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleUpdate}
                className="w-full inline-flex items-center justify-center gap-2 bg-pnp-navy hover:bg-pnp-navy-light text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm text-sm"
              >
                Update Report
              </button>
            </div>
          </div>

          {/* Quick reference guide */}
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-150 space-y-3">
            <h4 className="text-xs font-bold text-pnp-navy uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-pnp-gold" />
              Standard Operating Procedure
            </h4>
            <ul className="text-[11px] text-gray-500 space-y-2 leading-relaxed">
              <li className="flex gap-1.5">
                <span className="font-bold text-pnp-navy">1. Review Details:</span> Check submitted photos, location accuracy, and severity ranking.
              </li>
              <li className="flex gap-1.5">
                <span className="font-bold text-pnp-navy">2. Dispatch Patrol:</span> Match officers based on location proximity in Rodriguez.
              </li>
              <li className="flex gap-1.5">
                <span className="font-bold text-pnp-navy">3. Log Updates:</span> Set report status to "In Progress" once officers confirm arrival.
              </li>
              <li className="flex gap-1.5">
                <span className="font-bold text-pnp-navy">4. Case Resolution:</span> Log clear descriptions of resolution before marking "Resolved".
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
