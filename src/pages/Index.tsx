import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FiverrSection from "@/components/sections/FiverrSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import TeamSection from "@/components/sections/TeamSection";
import SocialSection from "@/components/sections/SocialSection";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FiverrSection />
        <ServicesSection />
        <ProjectsSection />
        <TechStackSection />
        <ReviewsSection />
        <TeamSection />
        <ContactSection />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
