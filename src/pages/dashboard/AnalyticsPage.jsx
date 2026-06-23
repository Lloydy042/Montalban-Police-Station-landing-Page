import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  Shield,
  TrendingUp,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  PieChart as PieIcon,
  BarChart3,
  Download,
} from 'lucide-react';
import {
  monthlyReportData,
  barangayReportData,
  mockReports,
} from '../../data/mockData';

const COLORS = ['#0D1B4C', '#1A3A8F', '#2A4E9B', '#D4A843', '#E5B84F', '#DC2626', '#10B981', '#64748B'];

export default function AnalyticsPage() {
  const reports = mockReports;

  // Aggregate reports by type
  const typeCounts = reports.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  const typeChartData = Object.keys(typeCounts).map((type) => ({
    name: type,
    value: typeCounts[type],
  }));

  // Aggregate reports by severity
  const severityCounts = reports.reduce((acc, curr) => {
    acc[curr.role || curr.severity] = (acc[curr.role || curr.severity] || 0) + 1;
    return acc;
  }, {});

  const severityChartData = Object.keys(severityCounts).map((sev) => ({
    name: sev,
    value: severityCounts[sev],
  }));

  // Summary Metrics
  const total = reports.length;
  const resolved = reports.filter((r) => r.status === 'Resolved').length;
  const active = total - resolved;
  const resolutionRate = total > 0 ? ((resolved / total) * 100).toFixed(1) : 0;

  const handleExport = () => {
    alert('Exporting analytics report as PDF/Excel... (Demo only)');
  };

  return (
    <div className="space-y-6">
      {/* Title & Action card */}
      <div className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-pnp-navy tracking-tight">
            Incident Analytics & Reporting
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Statistical data, heat distributions, and performance metrics for the Rodriguez Municipal Police Station.
          </p>
        </div>
        <div>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-pnp-navy hover:bg-pnp-navy-light text-white text-xs font-semibold rounded transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-9 h-9 rounded bg-pnp-navy/5 text-pnp-navy flex items-center justify-center shrink-0 border border-pnp-navy/5">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Total Incidents Logged
            </p>
            <p className="text-xl font-extrabold text-gray-900 mt-0.5">{total}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-9 h-9 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Active Investigations
            </p>
            <p className="text-xl font-extrabold text-gray-900 mt-0.5">{active}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-9 h-9 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Resolved Cases
            </p>
            <p className="text-xl font-extrabold text-gray-900 mt-0.5">{resolved}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-9 h-9 rounded bg-pnp-gold/10 text-pnp-gold flex items-center justify-center shrink-0 border border-pnp-gold/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Resolution Rate
            </p>
            <p className="text-xl font-extrabold text-gray-900 mt-0.5">
              {resolutionRate}%
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Chart 1: Incidents by Type */}
        <div className="bg-white p-5 rounded border border-gray-200 shadow-sm h-96 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
            <PieIcon className="w-4 h-4 text-pnp-navy" />
            <h3 className="font-bold text-[10px] uppercase tracking-wider text-pnp-navy">
              Incidents Distributed by Crime Category
            </h3>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {typeChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0D1B4C',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '11px',
                  }}
                />
                <Legend iconSize={8} iconType="circle" style={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Incidents by Monthly Trends */}
        <div className="bg-white p-5 rounded border border-gray-200 shadow-sm h-96 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
            <TrendingUp className="w-4 h-4 text-pnp-navy" />
            <h3 className="font-bold text-[10px] uppercase tracking-wider text-pnp-navy">
              Monthly Incident Trend (First Half of 2026)
            </h3>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyReportData}
                margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D1B4C" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0D1B4C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} style={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tickLine={false} style={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0D1B4C',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '11px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="reports"
                  stroke="#0D1B4C"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorReports)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Incidents by Barangay */}
        <div className="bg-white p-5 rounded border border-gray-200 shadow-sm h-[400px] md:col-span-2 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
            <BarChart3 className="w-4 h-4 text-pnp-navy" />
            <h3 className="font-bold text-[10px] uppercase tracking-wider text-pnp-navy">
              Barangay Heat Distribution (Rodriguez, Rizal)
            </h3>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barangayReportData}
                margin={{ top: 10, right: 10, left: -25, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="barangay"
                  tickLine={false}
                  style={{ fontSize: 9, fill: '#64748B' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis tickLine={false} style={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0D1B4C',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" fill="#1A3A8F" radius={0} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
