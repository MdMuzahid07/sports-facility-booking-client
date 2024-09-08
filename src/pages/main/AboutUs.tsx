import ContactInfo from "@/components/main/aboutUs/ContactInfo";
import HistoryAndTimeline from "@/components/main/aboutUs/HistoryAndTimeline";
import Mission from "@/components/main/aboutUs/Mission";
import TeamSection from "@/components/main/aboutUs/TeamSection";
import ScrollToTop from "@/components/ScrollToTop";
import PageTopByDefault from "@/utils/PageTopByDefault";

const AboutUs = () => {
    PageTopByDefault();

    return (
        <div className="bg-slate-200">
            <div className="max-w-7xl mx-auto px-4 xl:px-0 py-32">
                <Mission />
                <TeamSection />
                <HistoryAndTimeline />
                <ContactInfo />
            </div>
            <ScrollToTop />
        </div>
    );
};

export default AboutUs;