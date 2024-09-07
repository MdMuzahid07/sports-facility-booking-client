import FeaturedFacilities from "./components/main/FeaturedFacilities";
import Hero from "./components/main/Hero";
import HowItWorks from "./components/main/HowItWorks";
import Testimonial from "./components/main/Testimonial";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {

  return (
    <>
      <Hero />
      <HowItWorks />
      {/* <FeaturedFacilities /> */}
      <Testimonial />
      <ScrollToTop />
    </>
  )
};

export default App;