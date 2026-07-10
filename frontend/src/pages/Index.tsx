import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { CryptoTicker } from "@/components/CryptoTicker";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { Testimonials } from "@/components/sections/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <CryptoTicker />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Timeline />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
