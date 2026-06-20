import { useState, useRef } from 'react';
import {
  Megaphone,
  Trash2,
  Calendar,
  User,
  Edit,
  Check,
  Image as ImageIcon,
  X,
  Plus,
  Globe,
  Lock,
  MessageSquare,
  MoreHorizontal,
} from 'lucide-react';
import useAnnouncementStore from '../../store/useAnnouncementStore';
import useAuthStore from '../../store/useAuthStore';
import AnnouncementModal from '../../components/ui/AnnouncementModal';

export default function AnnouncementsPage() {
  const announcements = useAnnouncementStore((state) => state.announcements);
  const addAnnouncement = useAnnouncementStore((state) => state.addAnnouncement);
  const updateAnnouncement = useAnnouncementStore((state) => state.updateAnnouncement);
  const deleteAnnouncement = useAnnouncementStore((state) => state.deleteAnnouncement);
  const togglePublish = useAnnouncementStore((state) => state.togglePublish);

  const currentUser = useAuthStore((state) => state.user);

  const [activeAnnouncement, setActiveAnnouncement] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'Announcement',
    author: currentUser?.name || 'PLTCOL. Ernesto V. Mabini',
    is_published: true,
    image: null,
  });

  const fileInputRef = useRef(null);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this post?')) {
      deleteAnnouncement(id);
    }
  };

  const handleTogglePublish = (id, e) => {
    e.stopPropagation();
    togglePublish(id);
  };

  const handleEdit = (ann, e) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditingId(ann.id);
    setForm({
      title: ann.title,
      content: ann.content,
      category: ann.category,
      author: ann.author,
      is_published: ann.is_published,
      image: ann.image || null,
    });
    setShowPostModal(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setForm((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateAnnouncement(editingId, {
        title: form.title,
        content: form.content,
        category: form.category,
        author: form.author,
        is_published: form.is_published,
        image: form.image,
      });
      setIsEditing(false);
      setEditingId(null);
    } else {
      addAnnouncement({
        title: form.title,
        content: form.content,
        category: form.category,
        author: form.author,
        is_published: form.is_published,
        image: form.image,
      });
    }

    // Reset and Close
    setForm({
      title: '',
      content: '',
      category: 'Announcement',
      author: currentUser?.name || 'PLTCOL. Ernesto V. Mabini',
      is_published: true,
      image: null,
    });
    setShowPostModal(false);
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setForm({
      title: '',
      content: '',
      category: 'Announcement',
      author: currentUser?.name || 'PLTCOL. Ernesto V. Mabini',
      is_published: true,
      image: null,
    });
    setShowPostModal(true);
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
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Title Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-pnp-navy">Station Bulletin Feed</h2>
          <p className="text-xs text-gray-500 mt-0.5">Manage announcements and safety events with social-feed mechanics.</p>
        </div>
        <div className="w-10 h-10 bg-pnp-navy/5 rounded-full flex items-center justify-center border border-pnp-navy/10">
          <Megaphone className="w-5 h-5 text-pnp-navy" />
        </div>
      </div>

      {/* Facebook-style "Create Post" Card */}
      <div className="bg-white p-4 rounded-2xl border border-gray-250/70 shadow-sm space-y-3.5">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-pnp-navy rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm border border-pnp-navy/10">
            {currentUser?.name?.charAt(0) || 'A'}
          </div>
          <button
            onClick={openCreateModal}
            className="flex-1 bg-gray-100 hover:bg-gray-150 text-gray-500 rounded-full px-5 text-left text-sm transition-colors focus:outline-none border border-gray-200/50"
          >
            What announcement or event do you want to share, {currentUser?.name?.split(' ')[1] || 'Admin'}?
          </button>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-xs text-gray-600 font-semibold px-2">
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors flex-1 justify-center"
          >
            <ImageIcon className="w-4 h-4 text-green-500" />
            Photo/Image
          </button>
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors flex-1 justify-center"
          >
            <Plus className="w-4 h-4 text-pnp-gold" />
            New Event Advisory
          </button>
        </div>
      </div>

      {/* Facebook-style Post Feed List */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            onClick={() => setActiveAnnouncement(ann)}
            className="bg-white rounded-2xl border border-gray-250/70 shadow-sm overflow-hidden hover:shadow transition-shadow cursor-pointer flex flex-col group"
          >
            {/* Header info */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pnp-navy rounded-full flex items-center justify-center text-white font-bold shrink-0 border border-pnp-navy/10 shadow-sm">
                  {ann.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900 leading-tight">
                      {ann.author}
                    </span>
                    <span className="inline-block px-2 py-0.5 bg-pnp-navy/5 text-pnp-navy text-[9px] font-extrabold uppercase rounded">
                      {ann.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                    <span>{formatDate(ann.datePublished)}</span>
                    <span>&bull;</span>
                    {ann.is_published ? (
                      <Globe className="w-3 h-3 text-gray-400" title="Public" />
                    ) : (
                      <Lock className="w-3 h-3 text-gray-400" title="Draft (Only visible to admin)" />
                    )}
                  </div>
                </div>
              </div>

              {/* Edit/Delete Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => handleEdit(ann, e)}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-pnp-navy transition-colors"
                  title="Edit post"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDelete(ann.id, e)}
                  className="p-2 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-650 transition-colors"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3 space-y-2">
              <h3 className="font-extrabold text-gray-950 text-base leading-snug">
                {ann.title}
              </h3>
              <p className="text-gray-650 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap line-clamp-4">
                {ann.content}
              </p>
            </div>

            {/* Attached cover image */}
            {ann.image && (
              <div className="h-64 sm:h-80 w-full overflow-hidden bg-gray-100 border-t border-b border-gray-100 relative">
                <img
                  src={ann.image}
                  alt={ann.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
                />
              </div>
            )}

            {/* Social-style Feed Actions Footer */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-semibold select-none">
              <button 
                onClick={(e) => handleTogglePublish(ann.id, e)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  ann.is_published 
                    ? 'text-green-600 hover:bg-green-50' 
                    : 'text-gray-400 hover:bg-gray-200'
                }`}
              >
                <Check className="w-4 h-4" />
                {ann.is_published ? 'Published' : 'Draft / Private'}
              </button>
              <div className="text-[10px] text-gray-400 font-mono font-medium">
                {ann.id}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Social Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-scale-in">
            {/* Header */}
            <div className="p-4 border-b border-gray-150 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-pnp-navy flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-pnp-gold" />
                {isEditing ? 'Edit Station Post' : 'Create Station Post'}
              </h3>
              <button
                onClick={() => setShowPostModal(false)}
                className="p-1.5 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-pnp-navy rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm border border-pnp-navy/10">
                  {currentUser?.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{form.author}</h4>
                  <div className="flex gap-2 mt-1">
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-bold text-gray-600 focus:outline-none"
                    >
                      <option value="Announcement">Announcement</option>
                      <option value="Advisory">Advisory</option>
                      <option value="Operations">Operations</option>
                      <option value="Event">Event</option>
                      <option value="Internal">Internal</option>
                    </select>

                    <label className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-bold text-gray-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={form.is_published}
                        onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                        className="w-3 h-3 text-pnp-navy focus:ring-0 rounded"
                      />
                      <span>Public</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Post Title (e.g. Weather Advisory / Anti-Drug Campaign)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy bg-gray-50"
                />
              </div>

              {/* Text content */}
              <div>
                <textarea
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="What announcements or events do you want to publish to the community?"
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy bg-gray-50 resize-none"
                />
              </div>

              {/* Image upload preview widget */}
              {form.image ? (
                <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-gray-50 max-h-48 flex items-center justify-center">
                  <img
                    src={form.image}
                    alt="Upload preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-300 hover:border-pnp-navy rounded-xl py-6 flex flex-col items-center justify-center text-gray-500 hover:text-pnp-navy transition-all bg-gray-50/50"
                  >
                    <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">Add Photo Cover</span>
                    <span className="text-[10px] text-gray-450 mt-1">JPEG, PNG formats accepted</span>
                  </button>
                </div>
              )}

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center bg-pnp-navy hover:bg-pnp-navy-light text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-sm text-sm"
                >
                  {isEditing ? 'Update Post' : 'Post Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {activeAnnouncement && (
        <AnnouncementModal
          announcement={activeAnnouncement}
          onClose={() => setActiveAnnouncement(null)}
        />
      )}
    </div>
  );
}
