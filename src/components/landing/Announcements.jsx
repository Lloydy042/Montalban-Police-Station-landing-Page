import { useState } from 'react';
import { Calendar, User, ShieldAlert, Info } from 'lucide-react';
import useAnnouncementStore from '../../store/useAnnouncementStore';
import { mockSafetyAdvisories } from '../../data/mockData';
import AnnouncementModal from '../ui/AnnouncementModal';

export default function Announcements() {
  const announcements = useAnnouncementStore((state) => state.announcements);
  const publishedAnnouncements = announcements.filter((ann) => ann.is_published);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="announcements" className="py-20 lg:py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-title">Official Announcements & Advisories</h2>
          <div className="gold-underline mx-auto mt-3 mb-6" />
          <p className="text-gray-600 leading-relaxed">
            Stay informed with the latest updates, event advisories, and critical public safety alerts directly from the Rodriguez Municipal Police Station.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Announcements Column */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xl font-bold text-pnp-navy flex items-center gap-2 mb-6 pb-2 border-b border-gray-150">
              <span className="w-1.5 h-6 bg-pnp-navy rounded-sm" />
              Latest News & Public Updates
            </h3>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {publishedAnnouncements.map((ann) => (
                <article
                  key={ann.id}
                  onClick={() => setActiveAnnouncement(ann)}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
                >
                  {/* Card Thumbnail */}
                  {ann.image && (
                    <div className="h-44 w-full overflow-hidden bg-gray-150 relative">
                      <img 
                        src={ann.image} 
                        alt={ann.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category tag */}
                      <div className="mb-3">
                        <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-pnp-navy/5 text-pnp-navy border border-pnp-navy/10 rounded">
                          {ann.category}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-pnp-navy leading-snug mb-2 group-hover:text-pnp-gold transition-colors duration-250">
                        {ann.title}
                      </h4>

                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                        {ann.content}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-xs text-gray-405 pt-4 border-t border-gray-100 mt-auto">
                      <span className="flex items-center gap-1 font-medium text-gray-500">
                        <User className="w-3.5 h-3.5" />
                        {ann.author}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(ann.datePublished)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Safety Advisories Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-pnp-navy flex items-center gap-2 mb-6 pb-2 border-b border-gray-150">
              <span className="w-1.5 h-6 bg-pnp-gold rounded-sm" />
              Active Safety Advisories
            </h3>

            <div className="space-y-4">
              {mockSafetyAdvisories.map((advisory) => (
                <div
                  key={advisory.id}
                  className={`p-6 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                    advisory.riskLevel === 'High'
                      ? 'bg-red-50/70 border-red-200/80 text-red-900 shadow-sm shadow-red-500/5'
                      : 'bg-amber-50/70 border-amber-200/80 text-amber-900 shadow-sm shadow-amber-500/5'
                  }`}
                >
                  {/* Accent bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      advisory.riskLevel === 'High' ? 'bg-red-600' : 'bg-amber-600'
                    }`}
                  />

                  <div className="flex gap-4">
                    <div className="shrink-0 mt-0.5">
                      {advisory.riskLevel === 'High' ? (
                        <div className="p-1.5 rounded-lg bg-red-100 text-red-700">
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                          <Info className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-base tracking-tight leading-tight">
                          {advisory.title}
                        </h4>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded tracking-wider ${
                            advisory.riskLevel === 'High'
                              ? 'bg-red-200 text-red-800'
                              : 'bg-amber-200 text-amber-800'
                          }`}
                        >
                          {advisory.riskLevel} Risk
                        </span>
                      </div>

                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-3">
                        {advisory.description}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100/50">
                        <span>Issued: {formatDate(advisory.dateIssued)}</span>
                        <span className="font-medium text-pnp-navy">Active Alert Zone</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Hotline Quick Box */}
            <div className="mt-8 p-6 rounded-xl bg-pnp-navy text-white relative overflow-hidden shadow-lg shadow-pnp-navy/15">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54 48c-2 0-3-1-4-2l-7-7c-1-1-1-3 0-4l3-3c-1-3-3-6-6-9l-9-9 3-3c1-1 3-1 4 0l7 7c1 1 2 2 2 4v4\' fill=\'none\' stroke=\'%23ffffff\' stroke-width=\'2\'/%3E%3C/svg%3E")',
                }}
              />
              <h4 className="font-bold text-base text-pnp-gold mb-2 uppercase tracking-wide">
                Emergency Hotlines
              </h4>
              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                For immediate police assistance or emergency situations, please call our 24/7 hotline numbers:
              </p>
              <div className="space-y-2.5 font-mono text-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-gray-400 text-xs">Montalban Police:</span>
                  <span className="font-semibold">(02) 8941-1122</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-gray-400 text-xs">Mobile Hotline:</span>
                  <span className="font-semibold">0998-598-5612</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">NDRRMO Rizal:</span>
                  <span className="font-semibold">911 / 112</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {activeAnnouncement && (
        <AnnouncementModal 
          announcement={activeAnnouncement} 
          onClose={() => setActiveAnnouncement(null)} 
        />
      )}
    </section>
  );
}
