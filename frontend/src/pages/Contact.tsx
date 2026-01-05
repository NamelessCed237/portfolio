import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Contact as ContactSection } from "@/components/sections/Contact";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
