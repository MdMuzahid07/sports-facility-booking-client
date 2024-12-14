import ContactInfo from "@/components/main/aboutUs/ContactInfo";
import HistoryAndTimeline from "@/components/main/aboutUs/HistoryAndTimeline";
import Mission from "@/components/main/aboutUs/Mission";
import TeamSection from "@/components/main/aboutUs/TeamSection";
import ScrollToTop from "@/components/ScrollToTop";
import PageTopByDefault from "@/utils/PageTopByDefault";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
    PageTopByDefault();

    return (
        <>
            <Helmet>
                <title>PlayTime Pro | About Us</title>
                <meta
                    name="description"
                    content="PlayTime Pro, About us page"
                />
            </Helmet>
            <div className="bg-slate-200">
                <div className="h-[300px] w-screen">
                    <img className="h-full w-full object-cover" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725805321/Untitled_design_xi0qdl.png" alt="" />
                </div>
                <Mission />
                <TeamSection />
                <HistoryAndTimeline />
                <ContactInfo />

                <ScrollToTop />
            </div>
        </>

    );
};

export default AboutUs;