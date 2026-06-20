import { Shield, ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-pnp-navy pt-16 lg:pt-20 pb-12"
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pnp-navy via-pnp-navy-light to-pnp-blue opacity-100" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-pnp-gold/15 border border-pnp-gold/30 text-pnp-gold-light rounded-full text-xs font-medium tracking-wide uppercase mb-6">
                <Shield className="w-3.5 h-3.5" />
                Philippine National Police
              </span>
            </div>

            <h1 className="animate-fade-in-up animation-delay-200">
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
                AGAPAY
              </span>
              <span className="block mt-3 text-lg sm:text-xl lg:text-2xl font-medium text-pnp-gold">
                Integrated Incident Reporting
                <br className="hidden sm:block" /> and Monitoring System
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-400">
              Serving the community of Rodriguez, Rizal through a modern, accessible,
              and transparent public safety platform. Report incidents, track
              resolutions, and stay informed — all from your mobile device.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 bg-pnp-gold hover:bg-pnp-gold-dark text-pnp-navy font-semibold py-3.5 px-7 rounded-lg transition-colors duration-200 text-sm"
              >
                Report an Incident
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#home"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white hover:text-pnp-navy font-semibold py-3.5 px-7 rounded-lg transition-all duration-200 text-sm"
              >
                <Download className="w-4 h-4" />
                Download the App
              </a>
            </div>
          </div>

          {/* Shield / phone mockup graphic */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in-right animation-delay-400">
            <div className="relative w-80 h-[480px]">
              {/* Phone body */}
              <div className="absolute inset-0 bg-gray-900 rounded-[3rem] border-4 border-gray-700 shadow-2xl shadow-black/40 overflow-hidden">
                {/* Screen */}
                <div className="absolute inset-3 bg-gradient-to-b from-pnp-navy-dark via-pnp-navy to-pnp-blue rounded-[2.2rem] overflow-hidden flex flex-col">
                  {/* Status bar */}
                  <div className="flex items-center justify-center pt-4 pb-2">
                    <div className="w-20 h-5 bg-gray-900 rounded-full" />
                  </div>

                  {/* App content */}
                  <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-pnp-gold/20 border border-pnp-gold/40 flex items-center justify-center mb-4">
                      <Shield className="w-9 h-9 text-pnp-gold" />
                    </div>
                    <p className="text-white font-bold text-lg tracking-wide">AGAPAY</p>
                    <p className="text-gray-400 text-[10px] mt-1 tracking-wider uppercase">
                      Rodriguez, Rizal
                    </p>

                    {/* Mock buttons */}
                    <div className="w-full mt-8 space-y-3 px-2">
                      <div className="bg-pnp-gold/90 rounded-xl py-3 text-pnp-navy text-xs font-semibold">
                        Report an Incident
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-xl py-3 text-white text-xs font-medium">
                        View My Reports
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-xl py-3 text-white text-xs font-medium">
                        Safety Alerts
                      </div>
                    </div>

                    {/* Dots nav */}
                    <div className="flex gap-1.5 mt-auto mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-pnp-gold" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-8 bg-pnp-gold/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curved separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 30C1440 30 1200 0 720 0C240 0 0 30 0 30L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
