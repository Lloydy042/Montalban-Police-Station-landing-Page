import { useState } from 'react';
import {
  Megaphone,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Eye,
  Edit,
  AlertCircle,
  Check,
} from 'lucide-react';
import { mockAnnouncements } from '../../data/mockData';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'Announcement',
    author: 'Montalban Police Station',
    is_published: true,
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
    }
  };

  const handleTogglePublish = (id) => {
    setAnnouncements((prev) =>
      prev.map((ann) =>
        ann.id === id ? { ...ann, is_published: !ann.is_published, datePublished: ann.is_published ? null : new Date().toISOString() } : ann
      )
    );
  };

  const handleEdit = (ann) => {
    setIsEditing(true);
    setEditingId(ann.id);
    setForm({
      title: ann.title,
      content: ann.content,
      category: ann.category,
      author: ann.author,
      is_published: ann.is_published,
    });
    // Scroll form into view or focus
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setAnnouncements((prev) =>
        prev.map((ann) =>
          ann.id === editingId
            ? {
                ...ann,
                title: form.title,
                content: form.content,
                category: form.category,
                author: form.author,
                is_published: form.is_published,
                datePublished: form.is_published ? ann.datePublished || new Date().toISOString() : null,
              }
            : ann
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newAnn = {
        id: `ANN-${String(announcements.length + 1).padStart(3, '0')}`,
        title: form.title,
        content: form.content,
        category: form.category,
        author: form.author,
        is_published: form.is_published,
        datePublished: form.is_published ? new Date().toISOString() : null,
      };
      setAnnouncements((prev) => [newAnn, ...prev]);
    }

    // Reset form
    setForm({
      title: '',
      content: '',
      category: 'Announcement',
      author: 'Montalban Police Station',
      is_published: true,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not Published';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Title card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-pnp-navy">
          Announcements & Safety Advisories Manager
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Create, edit, and publish official announcements to be displayed on the public landing page and mobile application.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Input Form Card */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit">
          <h3 className="text-sm font-bold uppercase tracking-widest text-pnp-navy pb-2 border-b border-gray-100 mb-6 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-pnp-gold" />
            {isEditing ? 'Edit Announcement' : 'Create New Announcement'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Announcement Title
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Anti-Criminality Drive: Intensified Patrols"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy text-gray-700 bg-gray-50"
                >
                  <option value="Announcement">Announcement</option>
                  <option value="Advisory">Advisory</option>
                  <option value="Operations">Operations</option>
                  <option value="Event">Event</option>
                  <option value="Internal">Internal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Author / Publisher
                </label>
                <input
                  type="text"
                  required
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Content Body
              </label>
              <textarea
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write the full announcement details here. This will be visible to the public."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy bg-gray-50 resize-none"
              />
            </div>

            <div className="flex items-center gap-2.5 py-1.5">
              <input
                type="checkbox"
                id="is_published"
                checked={form.is_published}
                onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                className="w-4 h-4 text-pnp-navy border-gray-300 rounded focus:ring-pnp-navy"
              />
              <label htmlFor="is_published" className="text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer">
                Publish Immediately
              </label>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-pnp-navy hover:bg-pnp-navy-light text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm text-sm"
              >
                {isEditing ? 'Update Post' : 'Publish Post'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingId(null);
                    setForm({
                      title: '',
                      content: '',
                      category: 'Announcement',
                      author: 'Montalban Police Station',
                      is_published: true,
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right: Announcements Listing Card */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-pnp-navy pb-2 border-b border-gray-100 flex items-center justify-between">
            <span>Published Updates & drafts ({announcements.length})</span>
          </h3>

          <div className="space-y-4 max-h-[680px] overflow-y-auto pr-1">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all flex flex-col gap-3 relative"
              >
                {/* Status tag */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-pnp-navy/5 text-pnp-navy text-[10px] font-extrabold uppercase rounded tracking-wider">
                      {ann.category}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400 font-bold">
                      {ann.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleTogglePublish(ann.id)}
                      className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                        ann.is_published
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-150 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={ann.is_published ? 'Click to set Draft' : 'Click to Publish'}
                    >
                      {ann.is_published ? (
                        <>
                          <Check className="w-2.5 h-2.5" /> Published
                        </>
                      ) : (
                        <>Draft</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-bold text-gray-950 text-base leading-snug">
                  {ann.title}
                </h4>

                {/* Content */}
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {ann.content}
                </p>

                {/* Footer metadata & actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {ann.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(ann.datePublished)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEdit(ann)}
                      className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-pnp-navy transition-all"
                      title="Edit Post"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ann.id)}
                      className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-all"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
