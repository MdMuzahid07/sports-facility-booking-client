import { Earth, MailOpen, MapPin, Phone } from "lucide-react"

const ContactInfo = () => {
    return (
        <section className="py-32">
            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-extrabold mb-5 ">Contact Info</h3>
            <p className="text-xl md:text-2xl lg:text-3xl">We'd love to hear from you!</p>

            <div className="mt-10">
                <div className="flex items-center flex-wrap xl:flex-nowrap justify-between gap-10">
                    <div className="mb-4">
                        <p className="text-xl md:text-2xl lg:text-3xl flex items-center gap-2"><MapPin size={30} />  <span>Office Address:</span></p>
                        <p className="text-xl md:text-2xl lg:text-3xl">1234 Main St, Suite 100, City, Country</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-xl md:text-2xl lg:text-3xl flex items-center gap-2"><Phone size={30} /> <span>Phone:</span></p>
                        <p className="text-xl md:text-2xl lg:text-3xl">+123-456-7890</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-xl md:text-2xl lg:text-3xl flex items-center gap-2"><MailOpen size={30} /> <span>Email:</span></p>
                        <p className="text-xl md:text-2xl lg:text-3xl">info@company.com</p>
                    </div>
                    <div>
                        <Earth size={50} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactInfo