import ExploreFacilities from "./components/main/ExploreFacilities";
import FeaturedFacilities from "./components/main/featured/FeaturedFacilities";
import FeaturedProducts from "./components/main/featured/FeaturedProducts";
import Hero from "./components/main/Hero";
import HowItWorks from "./components/main/HowItWorks";
import MosaicSportsGallery from "./components/main/MosaicSportsGallery";
import WinterSaleFacilities from "./components/main/onSale/WinterSaleFacilities";
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
      <WinterSaleFacilities />
      <FeaturedFacilities />
      <ExploreFacilities />
      {/* <FeaturedProducts/> */}
      <ShopSection />
      <Testimonial />
      <MosaicSportsGallery />
      <ScrollToTop />
    </main>
  )
};

export default App;