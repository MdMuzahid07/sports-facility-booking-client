import FeaturedFacilities from "./components/main/FeaturedFacilities";
import Hero from "./components/main/Hero";
import HowItWorks from "./components/main/HowItWorks";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {

  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedFacilities />

      <ScrollToTop />
    </>
  )
};

export default App;