import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import HowItWorks from '../components/landing/HowItWorks';
import Announcements from '../components/landing/Announcements';
import Contact from '../components/landing/Contact';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <HowItWorks />
        <Announcements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
