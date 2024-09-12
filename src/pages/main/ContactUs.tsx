import ContactForm from "@/components/main/contactUs/ContactForm";
import Map from "@/components/main/contactUs/Map";
import ScrollToTop from "@/components/ScrollToTop";
import PageTopByDefault from "@/utils/PageTopByDefault";

const ContactUs = () => {
    PageTopByDefault();

    return (
        <section className="bg-slate-200">
            <Map />
            <div className="max-w-7xl mx-auto py-32 px-4 xl:px-0">
                <ContactForm />
            </div>

            <ScrollToTop />
        </section>
    )
};

export default ContactUs;