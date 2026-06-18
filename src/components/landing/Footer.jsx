import { Shield, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-pnp-navy-dark text-white border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand block */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pnp-gold flex items-center justify-center">
                <Shield className="w-5.5 h-5.5 text-pnp-navy" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-wider text-white">AGAPAY</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The Integrated Incident Reporting and Monitoring System of the Rodriguez Municipal Police Station, Rizal. Empowering citizens and police officers for a safer, more responsive community.
            </p>
            <div className="text-[11px] text-gray-500 font-mono">
              System Version: 1.0.0 (Build 2026.06)
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pnp-gold-light">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleScrollTo(e, '#home')}
                  className="hover:text-white transition-colors"
                >
                  Home / Top
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScrollTo(e, '#about')}
                  className="hover:text-white transition-colors"
                >
                  About AGAPAY
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleScrollTo(e, '#how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#announcements"
                  onClick={(e) => handleScrollTo(e, '#announcements')}
                  className="hover:text-white transition-colors"
                >
                  Announcements
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Government Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pnp-gold-light">
              Official Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <a
                  href="https://www.pnp.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  PNP Portal <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pnpclearance.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  PNP Clearance <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  GOV.PH Portal <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="http://rodriguezrizal.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  Rodriguez LGU <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Compliance block */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pnp-gold-light">
              Privacy & Compliance
            </h4>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs leading-relaxed space-y-2.5">
              <span className="block text-pnp-gold font-bold text-[10px] uppercase tracking-wider">
                Republic Act No. 10173
              </span>
              <p className="text-[11px] leading-relaxed">
                AGAPAY complies with the <strong>Data Privacy Act of 2012</strong>. All personal data, report contents, photo files, and location information are stored and processed securely for emergency response and police records management only.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center sm:text-left">
          <div>
            &copy; {currentYear} AGAPAY. All Rights Reserved. <br className="sm:hidden" /> Developed for Rodriguez Municipal Police Station.
          </div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
