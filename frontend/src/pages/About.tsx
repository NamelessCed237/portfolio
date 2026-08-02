import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { Strengths } from "@/components/sections/Strengths";
import { Process } from "@/components/sections/Process";
import { Skills } from "@/components/sections/Skills";
import { FAQ } from "@/components/sections/FAQ";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <AboutIntro />
        <Strengths />
        <Process />
        <Skills />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default About;
