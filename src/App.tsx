import FeaturedFacilities from "./components/main/FeaturedFacilities";
import Hero from "./components/main/Hero";
import HowItWorks from "./components/main/HowItWorks";
import MosaicSportsGallery from "./components/main/MosaicSportsGallery";
import ShopSection from "./components/main/shop/ShopSection";
import Testimonial from "./components/main/Testimonial";
import ScrollToTop from "./components/ScrollToTop";
import PageTopByDefault from "./utils/PageTopByDefault";

const App = () => {
  PageTopByDefault();

  return (
    <main>
      <Hero />
      <HowItWorks />
      <FeaturedFacilities />
      <ShopSection />
      <Testimonial />
      <MosaicSportsGallery />
      <ScrollToTop />
    </main>
  )
};

export default App;