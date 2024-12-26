import { Helmet } from "react-helmet-async";
import ExploreFacilities from "./components/main/ExploreFacilities";
import FeaturedFacilities from "./components/main/featured/FeaturedFacilities";
// import FeaturedProducts from "./components/main/featured/FeaturedProducts";
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
      <Helmet>
        <title>PlayTime Pro | Home</title>
        <meta
          name="description"
          content="PlayTime Pro, is a sports facility booking platform, with in build sports products e-commerce store"
        />
        <meta name="robots" content="index, follow" />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Md.Muzahid" />
      </Helmet>
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