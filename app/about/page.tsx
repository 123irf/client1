import AboutHero from "@/components/AboutHero";
import WhyValue from "@/components/WhyValue";
import BrandPromise from "@/components/BrandPromise";

export default function AboutPage() {
  return (
    <main>
      {/* About Hero Banner + Mission & Vision */}
      <AboutHero />

      {/* Why Value With KidZoFi Care */}
      <WhyValue />

      {/* Brand Promise Section */}
      <BrandPromise />
    </main>
  );
}
