import HeroSection from "@/components/HeroSection";
import CollectionSection from "@/components/CollectionSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <CollectionSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
