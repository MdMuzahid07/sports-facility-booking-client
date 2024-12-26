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