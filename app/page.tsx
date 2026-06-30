import HeroSection from "@/components/HeroSection";
import FeaturedCars from "@/components/FeaturedCars";
import CategorySection from "@/components/CategorySection";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import AirportPickup from "@/components/AirportPickup";
import Testimonials from "@/components/Testimonials";
import FaqPreview from "@/components/FaqPreview";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCars />
      <CategorySection />
      <WhyChooseUs />
      <HowItWorks />
      <AirportPickup />
      <Testimonials />
      <FaqPreview />
      <CTASection />
    </>
  );
}
