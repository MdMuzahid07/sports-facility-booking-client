import ContactForm from "@/components/main/contactUs/ContactForm";
import Map from "@/components/main/contactUs/Map";
import PageTopByDefault from "@/utils/PageTopByDefault";

const ContactUs = () => {
    PageTopByDefault();

    return (
        <div className="bg-slate-200">
            <Map />
            <div className="max-w-7xl mx-auto py-32 px-4 xl:px-0">
                <ContactForm />
            </div>
        </div>
    )
};

export default ContactUs;