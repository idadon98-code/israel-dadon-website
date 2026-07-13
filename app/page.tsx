import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import WhyChooseMe from "./components/WhyChooseMe";
import HowItWorks from "./components/HowItWorks";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TrustBar />
      <Portfolio />
      <About />
      <WhyChooseMe />
      <HowItWorks />
    <ContactSection />
    <Footer />
<FloatingWhatsApp />
    </>
  );
}