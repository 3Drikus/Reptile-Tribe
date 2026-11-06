import AboutSection from "@/components/AboutSection";
import CollectionSection from "@/components/CollectionSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <CollectionSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
