import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { About as AboutSection } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <AboutSection />
        <Skills />
        <Timeline />
      </main>
      <Footer />
    </div>
  );
};

export default About;
