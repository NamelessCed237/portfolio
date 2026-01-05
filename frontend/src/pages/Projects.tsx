import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Projects as ProjectsSection } from "@/components/sections/Projects";

const Projects = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
