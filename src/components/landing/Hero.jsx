import { Shield, ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A1233] pt-16 lg:pt-20 pb-16"
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[#070F2B] opacity-100" />
      <div
        className="absolute inset-0 opacity-[0.03]"
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
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-pnp-gold/10 border border-pnp-gold/30 text-pnp-gold rounded text-xs font-semibold tracking-wide uppercase mb-6">
                <Shield className="w-3.5 h-3.5" />
                Philippine National Police
              </span>
            </div>

            <h1 className="animate-fade-in-up animation-delay-200">
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
                AGAPAY
              </span>
              <span className="block mt-3 text-lg sm:text-xl lg:text-2xl font-bold text-pnp-gold uppercase tracking-wide">
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
                className="btn-primary inline-flex items-center justify-center gap-2 py-3.5 px-7 text-sm"
              >
                Report an Incident
                <ArrowRight className="w-4 h-4 text-pnp-navy" strokeWidth={2.5} />
              </a>
              <a
                href="#home"
                className="btn-outline inline-flex items-center justify-center gap-2 py-3.5 px-7 text-sm"
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
              <div className="absolute inset-0 bg-slate-900 rounded-[3rem] border-4 border-slate-700 shadow-2xl shadow-black/40 overflow-hidden">
                {/* Screen */}
                <div className="absolute inset-3 bg-[#070F2B] rounded-[2.2rem] overflow-hidden flex flex-col">
                  {/* Status bar */}
                  <div className="flex items-center justify-center pt-4 pb-2">
                    <div className="w-20 h-4 bg-slate-900 rounded-full" />
                  </div>

                  {/* App content */}
                  <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                    <div className="w-14 h-14 rounded bg-pnp-gold/10 border border-pnp-gold/30 flex items-center justify-center mb-4">
                      <Shield className="w-8 h-8 text-pnp-gold" />
                    </div>
                    <p className="text-white font-bold text-lg tracking-wide">AGAPAY</p>
                    <p className="text-pnp-gold text-[9px] mt-1 tracking-wider uppercase font-semibold">
                      Rodriguez, Rizal
                    </p>

                    {/* Mock buttons */}
                    <div className="w-full mt-8 space-y-3 px-2">
                      <div className="bg-pnp-gold rounded py-3 text-pnp-navy text-xs font-bold shadow-sm">
                        Report an Incident
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded py-3 text-white text-xs font-semibold">
                        View My Reports
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded py-3 text-white text-xs font-semibold">
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
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gold separator */}
      <div className="absolute bottom-0 left-0 right-0 border-b-4 border-pnp-gold" />
    </section>
  );
}
