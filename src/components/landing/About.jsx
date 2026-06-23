import { FileText, Radio, Bell } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Report Incidents',
    description:
      'Submit incident reports anytime, anywhere through the AGAPAY mobile application. Provide details, attach photos, and choose to report anonymously.',
  },
  {
    icon: Radio,
    title: 'Real-Time Tracking',
    description:
      'Monitor the status of your submitted reports in real time. Receive updates as officers are assigned, dispatched, and when your case is resolved.',
  },
  {
    icon: Bell,
    title: 'Safety Alerts',
    description:
      'Stay informed with official public safety advisories, weather alerts, and community announcements directly from the Montalban Police Station.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-title">About AGAPAY</h2>
          <div className="gold-underline mx-auto mt-3 mb-6" />
          <p className="text-gray-600 leading-relaxed">
            AGAPAY is the official Integrated Incident Reporting and Monitoring System
            of the Rodriguez Municipal Police Station (formerly Montalban). It is
            designed to bridge the gap between the community and law enforcement by
            providing an accessible, efficient, and transparent platform for public
            safety coordination in Rodriguez, Rizal.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className={`card group hover:border-pnp-gold/50 hover:shadow-md transition-all duration-200 cursor-pointer text-center ${
                i === 0
                  ? 'animate-fade-in-up'
                  : i === 1
                  ? 'animate-fade-in-up animation-delay-200'
                  : 'animate-fade-in-up animation-delay-400'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-50 border border-gray-200 flex items-center justify-center mb-5 group-hover:bg-pnp-navy group-hover:border-pnp-gold transition-all duration-200">
                <Icon className="w-5 h-5 text-pnp-navy group-hover:text-pnp-gold transition-all duration-200" />
              </div>
              <h3 className="text-lg font-bold text-pnp-navy mb-3">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
