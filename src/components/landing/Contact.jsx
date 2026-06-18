import { useState } from 'react';
import { Phone, MapPin, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In demo, show success message
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-title">Contact & Location</h2>
          <div className="gold-underline mx-auto mt-3 mb-6" />
          <p className="text-gray-600 leading-relaxed">
            Reach out to the Montalban Police Station for inquiries, coordinate community programs, or visit us. For immediate emergencies, please call the hotlines directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="bg-pnp-navy text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex-1">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54 48c-2 0-3-1-4-2l-7-7c-1-1-1-3 0-4l3-3c-1-3-3-6-6-9l-9-9 3-3c1-1 3-1 4 0l7 7c1 1 2 2 2 4v4\' fill=\'none\' stroke=\'%23ffffff\' stroke-width=\'2\'/%3E%3C/svg%3E")',
                }}
              />
              <h3 className="text-xl font-bold text-pnp-gold mb-6 tracking-wide">
                STATION INFORMATION
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <MapPin className="w-5 h-5 text-pnp-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                      Office Address
                    </h4>
                    <p className="text-sm text-gray-250 leading-relaxed">
                      J. P. Rizal St, Rodriguez (Montalban), Rizal, 1860, Philippines
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <Phone className="w-5 h-5 text-pnp-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                      Telephone / Mobile
                    </h4>
                    <p className="text-sm font-mono text-gray-250 leading-relaxed">
                      Landline: (02) 8941-1122 <br />
                      Mobile: +63 998-598-5612 / 0917-889-1234
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <Mail className="w-5 h-5 text-pnp-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                      Email Address
                    </h4>
                    <p className="text-sm font-mono text-gray-250 leading-relaxed">
                      montalban.pnp@yahoo.com <br />
                      support.agapay@rodriguezrizal.gov.ph
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <Clock className="w-5 h-5 text-pnp-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                      Operating Hours
                    </h4>
                    <p className="text-sm text-gray-250 leading-relaxed">
                      Public Desk & Administration: 8:00 AM – 5:00 PM <br />
                      Emergency Patrol & Incident Desk: 24 Hours / 7 Days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Mock/Embed Box */}
            <div className="h-60 w-full rounded-2xl border border-gray-200 overflow-hidden shadow-sm relative bg-gray-250">
              {/* Fallback mock map graphic using Tailwind */}
              <div className="absolute inset-0 bg-blue-50 flex flex-col items-center justify-center p-4 text-center">
                <MapPin className="w-10 h-10 text-pnp-navy mb-2 animate-bounce" />
                <span className="font-bold text-pnp-navy text-sm">Montalban Police Station Map</span>
                <span className="text-xs text-gray-500 mt-1">J.P. Rizal St., Rodriguez, Rizal</span>
                {/* Visual grid representing map roads */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{
                    backgroundImage: 'radial-gradient(#0D1B4C 1.5px, transparent 1.5px), radial-gradient(#0D1B4C 1.5px, #f8fafc 1.5px)',
                    backgroundSize: '30px 30px',
                    backgroundPosition: '0 0, 15px 15px'
                  }}
                />
                <a 
                  href="https://maps.google.com/?q=Montalban+Police+Station+Rodriguez+Rizal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 px-4 py-1.5 bg-pnp-navy hover:bg-pnp-navy-light text-white text-xs font-semibold rounded-md transition-colors shadow-sm"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative">
            <h3 className="text-xl font-bold text-pnp-navy mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-pnp-navy rounded-sm" />
              General Inquiry Form
            </h3>

            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h4>
                <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to the Montalban Police Station. We will review your inquiry and respond to your email address shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-pnp-navy mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Juan Dela Cruz"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy text-sm transition-all bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-pnp-navy mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. juan@gmail.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy text-sm transition-all bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-pnp-navy mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 09171234567"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy text-sm transition-all bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-pnp-navy mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Clearance Inquiry"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy text-sm transition-all bg-gray-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-pnp-navy mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message or inquiry here..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pnp-navy/20 focus:border-pnp-navy text-sm transition-all bg-gray-50/50 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-pnp-navy hover:bg-pnp-navy-light text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow text-sm"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
