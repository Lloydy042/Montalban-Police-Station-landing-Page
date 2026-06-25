import { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Announcements', href: '#announcements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-pnp-navy ${
        scrolled ? 'shadow-lg shadow-black/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="w-9 h-9 rounded bg-pnp-gold flex items-center justify-center">
              <Shield className="w-5 h-5 text-pnp-navy" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <span className="block text-white font-bold text-lg tracking-wide">
                AGAPAY
              </span>
              <span className="hidden sm:block text-gray-300 text-[11px] tracking-wide">
                Montalban Police Station
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-pnp-gold focus-visible:ring-offset-2 outline-none cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pnp-gold focus-visible:ring-offset-2 rounded cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-3 space-y-1 bg-pnp-navy-dark">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-pnp-gold outline-none cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
