import { X, Calendar, User, Shield } from 'lucide-react';

export default function AnnouncementModal({ announcement, onClose }) {
  if (!announcement) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not Published';
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
    <div 
      className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="relative bg-white rounded shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-150 animate-scale-in max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Image */}
        {announcement.image ? (
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
            <img 
              src={announcement.image} 
              alt={announcement.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Category tag */}
            <span className="absolute bottom-4 left-4 inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-pnp-navy text-white rounded shadow-md border border-white/10">
              {announcement.category}
            </span>
          </div>
        ) : (
          <div className="p-6 bg-pnp-navy text-white relative">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-pnp-gold text-pnp-navy rounded mb-2">
              {announcement.category}
            </span>
            <h4 className="text-xl font-bold tracking-tight pr-8">{announcement.title}</h4>
          </div>
        )}

        {/* Modal Header Actions */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded bg-black/40 hover:bg-black/60 text-white transition-colors border border-white/10 shadow z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-1">
          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500 pb-4 border-b border-gray-150">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-pnp-navy/5 flex items-center justify-center border border-pnp-navy/10 shrink-0">
                <User className="w-4 h-4 text-pnp-navy" />
              </div>
              <div>
                <p className="font-bold text-gray-800 leading-tight">
                  {announcement.author}
                </p>
                <p className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5">
                  Montalban Police Officer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(announcement.datePublished)}</span>
            </div>
          </div>

          {/* Title (if image covers top) */}
          {announcement.image && (
            <h3 className="text-xl sm:text-2xl font-extrabold text-pnp-navy tracking-tight leading-snug">
              {announcement.title}
            </h3>
          )}

          {/* Post Description */}
          <div className="text-sm sm:text-base text-gray-650 leading-relaxed space-y-4">
            <p className="whitespace-pre-wrap">{announcement.content}</p>
          </div>

          {/* Footer badge */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100/70 text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-pnp-gold" />
              Official Advisory Bulletin
            </span>
            <span className="font-semibold font-mono">{announcement.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
