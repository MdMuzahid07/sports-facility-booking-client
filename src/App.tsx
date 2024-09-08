import FeaturedFacilities from "./components/main/FeaturedFacilities";
import Hero from "./components/main/Hero";
import HowItWorks from "./components/main/HowItWorks";
import MosaicSportsGallery from "./components/main/MosaicSportsGallery";
import Testimonial from "./components/main/Testimonial";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {

  return (
    <main>
      <Hero />
      <HowItWorks />
      <FeaturedFacilities />
      <Testimonial />
      <MosaicSportsGallery />
      <ScrollToTop />
    </main>
  )
};

export default App;