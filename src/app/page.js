import DemoSection from "./components/Homepage/DemoSection/DemoSection";
import FeaturesSection from "./components/Homepage/FeaturesSection/FeaturesSection";
import HeroSection from "./components/Homepage/HeroSection/HeroSection";
import Navbar from "./components/Homepage/Navbar/Navbar";
import SubSection from "./components/Homepage/SubSection/SubSection";
import TestimonialSection from "./components/Homepage/TestimonialSection/TestimonialSection";
import Footer from "./components/Homepage/Footer/Footer";

export const metadata = {
  title: "Plates Up",
  description: "This is a description of my page",
};

export default function Home() {
  return (
    <>
      <div className="mainContainer">
        <Navbar />
        <HeroSection />
        <SubSection />
        <FeaturesSection />
        <TestimonialSection />
        <DemoSection />
        <Footer />
      </div>
    </>
  );
}
