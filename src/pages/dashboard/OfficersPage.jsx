import { useState } from 'react';
import {
  Shield,
  Phone,
  Plus,
  Trash2,
} from 'lucide-react';
import useOfficerStore from '../../store/useOfficerStore';

export default function OfficersPage() {
  const officers = useOfficerStore((state) => state.officers);
  const addOfficer = useOfficerStore((state) => state.addOfficer);
  const updateOfficerStatus = useOfficerStore((state) => state.updateOfficerStatus);
  const deleteOfficer = useOfficerStore((state) => state.deleteOfficer);

  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    rank: 'Patrolman',
    badgeNumber: '',
    contact: '',
    status: 'Available',
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'On Assignment':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Off Duty':
        return 'bg-gray-100 text-gray-750 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDeleteOfficer = (id) => {
    if (confirm('Are you sure you want to delete this officer record?')) {
      deleteOfficer(id);
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus =
      currentStatus === 'Available'
        ? 'On Assignment'
        : currentStatus === 'On Assignment'
        ? 'Off Duty'
        : 'Available';
    updateOfficerStatus(id, nextStatus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOfficer({
      name: form.name,
      rank: form.rank,
      badgeNumber: form.badgeNumber,
      contact: form.contact,
      status: form.status,
    });
    
    setShowAddForm(false);
    setForm({
      name: '',
      rank: 'Patrolman',
      badgeNumber: '',
      contact: '',
      status: 'Available',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-pnp-navy tracking-tight">
            Field Officer Directory
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor, assign, and manage registered police officers at Rodriguez Municipal Police Station.
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-pnp-navy hover:bg-pnp-navy-light text-white text-xs font-semibold rounded transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            {showAddForm ? 'Close Form' : 'Register Officer'}
          </button>
        </div>
      </div>

      {/* Add Officer Form Panel */}
      {showAddForm && (
        <div className="bg-white p-6 rounded border border-gray-200 shadow-sm animate-fade-in-up">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-pnp-navy pb-2 border-b border-gray-100 mb-5 flex items-center gap-2">
            <Shield className="w-4 h-4 text-pnp-gold" />
            Officer Registration Form
          </h3>

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Officer Full Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. PO3 Ricardo Dela Cruz"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-pnp-navy/10 focus:border-pnp-navy bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Police Rank
              </label>
              <select
                value={form.rank}
                onChange={(e) => setForm({ ...form, rank: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-pnp-navy/10 focus:border-pnp-navy text-gray-700 bg-gray-50"
              >
                <option value="Patrolman">Patrolman (Pat)</option>
                <option value="Police Corporal">Police Corporal (PCpl)</option>
                <option value="Police Sergeant">Police Sergeant (PSg)</option>
                <option value="Police Staff Sergeant">Police Staff Sergeant (PSSg)</option>
                <option value="Police Master Sergeant">Police Master Sergeant (PMSg)</option>
                <option value="Police Executive Master Sergeant">Police Executive Master Sergeant (PEMS)</option>
                <option value="Police Lieutenant">Police Lieutenant (PLT)</option>
                <option value="Police Captain">Police Captain (PCPT)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Badge / Serial Number
              </label>
              <input
                type="text"
                required
                value={form.badgeNumber}
                onChange={(e) => setForm({ ...form, badgeNumber: e.target.value })}
                placeholder="e.g. 195822"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-pnp-navy/10 focus:border-pnp-navy bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                required
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                placeholder="e.g. 0998-xxx-xxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-pnp-navy/10 focus:border-pnp-navy bg-gray-50 text-gray-700"
              />
            </div>

            <div className="sm:col-span-2 md:col-span-1 pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-pnp-navy hover:bg-pnp-navy-light text-white font-semibold py-2.5 px-4 rounded transition-colors shadow-sm text-xs"
              >
                Register Officer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Officers List Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {officers.map((officer) => (
          <div
            key={officer.id}
            className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Header banner */}
            <div className="bg-pnp-navy px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-pnp-gold shrink-0" />
                <span className="font-mono text-[10px] text-white/50 font-bold">
                  {officer.badgeNumber ? `BADGE ${officer.badgeNumber}` : officer.id}
                </span>
              </div>
              <span
                onClick={() => handleToggleStatus(officer.id, officer.status)}
                className={`px-2 py-0.5 border text-[9px] font-extrabold uppercase rounded tracking-wider cursor-pointer select-none transition-colors ${getStatusClass(
                  officer.status
                )}`}
                title="Click to toggle status"
              >
                {officer.status}
              </span>
            </div>

            {/* Officer Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-pnp-navy leading-snug">
                  {officer.name}
                </h3>
                <p className="text-[10px] text-pnp-gold font-semibold uppercase tracking-wider mt-0.5">
                  {officer.rank}
                </p>

                <div className="mt-4 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="font-mono">{officer.contact}</span>
                  </div>
                </div>
              </div>

              {/* Current assignment panel */}
              <div className="pt-3.5 border-t border-gray-100 flex flex-col gap-2">
                <span className="block text-[9px] font-bold text-gray-405 uppercase tracking-widest">
                  Current Assignment
                </span>
                {officer.status === 'On Assignment' && officer.currentAssignment ? (
                  <div className="bg-blue-50/30 border border-blue-200/50 rounded p-2 flex items-center justify-between text-xs">
                    <div className="text-blue-900 font-medium">
                      Investigating: <span className="font-mono font-bold text-blue-950">{officer.currentAssignment}</span>
                    </div>
                  </div>
                ) : officer.status === 'On Assignment' ? (
                  <div className="bg-blue-50/30 border border-blue-200/50 rounded p-2 text-xs text-blue-900 font-medium italic">
                    Assigned to Active Case
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 italic">
                    No active case assigned
                  </div>
                )}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[9px] text-gray-400 font-medium italic">
                Authorized Personnel
              </span>
              <button
                onClick={() => handleDeleteOfficer(officer.id)}
                className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 border border-transparent hover:border-red-200 transition-all"
                title="Remove Officer Record"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
