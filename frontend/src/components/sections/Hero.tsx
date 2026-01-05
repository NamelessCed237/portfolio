import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Hero = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:cedric@example.com", label: "Email" },
  ];

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>
      
      <div className="max-w-7xl mx-auto w-full px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Social Links - Vertical */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:flex flex-row gap-4 absolute left-8 bottom-1 -translate-y-1/2"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>

            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground"
              >
                {t("hero.greeting")}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                {t("hero.name")}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl md:text-4xl font-semibold"
              >
                A <span className="gradient-text">Web Developer</span> & <span className="gradient-text">Blockchain Enthusiast</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                {t("hero.subtitle")}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contact">
                <Button size="lg" className="gap-2 hover-glow min-w-[140px]">
                  Hire Me
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 min-w-[180px]">
                <Download className="h-5 w-5" />
                {t("hero.downloadCV")}
              </Button>
            </motion.div>

            {/* Mobile Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex lg:hidden gap-4 pt-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-auto">
              {/* Decorative Elements */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary/20 blur-3xl"
              ></motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-secondary/20 blur-3xl"
              ></motion.div>
              
              {/* Main Image Container */}
              <div className="relative h-full rounded-2xl overflow-hidden glass-card">
                {/* Placeholder for profile image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto rounded-full bg-muted flex items-center justify-center">
                      <span className="text-5xl font-bold gradient-text">BC</span>
                    </div>
                    <p className="text-muted-foreground text-sm px-4">
                      Upload your professional photo here
                    </p>
                  </div>
                </div>
                
                {/* Uncomment and update src when you have your photo */}
                {/* <img 
                  src="/path-to-your-photo.jpg" 
                  alt="Bike Cedric"
                  className="w-full h-full object-cover"
                /> */}
              </div>

              {/* Decorative geometric shapes */}
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ delay: 1, duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-primary/30 rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
