import { Send, ClipboardCheck, MapPin, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Send,
    title: 'Submit Report',
    description:
      'Citizens submit an incident report through the AGAPAY mobile app with details, location, and optional photo evidence.',
  },
  {
    number: '02',
    icon: ClipboardCheck,
    title: 'Officer Review',
    description:
      'The desk officer at the Montalban Police Station receives and reviews the report on the AGAPAY web dashboard.',
  },
  {
    number: '03',
    icon: MapPin,
    title: 'Field Response',
    description:
      'A field officer is dispatched to the scene. The citizen can track the status and assigned officer in real time.',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Resolution',
    description:
      'The case is resolved, the report is updated, and the citizen is notified of the outcome through the app.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-title">How It Works</h2>
          <div className="gold-underline mx-auto mt-3 mb-6" />
          <p className="text-gray-600 leading-relaxed">
            From report submission to case resolution — the AGAPAY system streamlines
            every step of incident response for the Rodriguez community.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {steps.map(({ number, icon: Icon, title, description }, i) => (
            <div key={number} className="relative flex flex-col items-center text-center px-4">
              {/* Connecting line — visible on desktop between items */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-pnp-gold/30">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-pnp-gold/50" />
                </div>
              )}

              {/* Number circle */}
              <div className="relative z-10 w-16 h-16 rounded bg-pnp-navy flex items-center justify-center mb-5 shadow-sm border border-pnp-gold/20">
                <Icon className="w-6 h-6 text-pnp-gold" />
              </div>

              {/* Step number */}
              <span className="text-xs font-extrabold text-pnp-gold-dark tracking-widest uppercase mb-2">
                Step {number}
              </span>

              <h3 className="text-lg font-bold text-pnp-navy mb-3">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{description}</p>

              {/* Mobile connector arrow */}
              {i < steps.length - 1 && (
                <div className="lg:hidden flex justify-center mt-6 mb-2">
                  <div className="w-px h-8 bg-pnp-gold/40 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rotate-45 border-b-2 border-r-2 border-pnp-gold/60" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
