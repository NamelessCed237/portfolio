import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Services as ServicesSection } from "@/components/sections/Services";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
