import ContactForm from "@/components/main/contactUs/ContactForm";
import Map from "@/components/main/contactUs/Map";
import ScrollToTop from "@/components/ScrollToTop";
import PageTopByDefault from "@/utils/PageTopByDefault";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
    PageTopByDefault();

    return (
        <>
            <Helmet>
                <title>PlayTime Pro | Contact Us</title>
                <meta
                    name="description"
                    content="PlayTime Pro, Contact us page"
                />
            </Helmet>

            <section className="bg-slate-200">
                <Map />
                <div className="max-w-7xl mx-auto py-32 px-4 xl:px-0">
                    <ContactForm />
                </div>

                <ScrollToTop />
            </section>
        </>

    )
};

export default ContactUs;