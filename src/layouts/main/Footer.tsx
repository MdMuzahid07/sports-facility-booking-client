import { Copyright, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    const date = new Date().getFullYear();

    return (
        <footer className="bg-[#2E2E2E] px-4 xl:px-0 text-white roboto-regular">
            <div>
                <div
                    className="max-w-7xl mx-auto w-full pt-32 pb-20 flex justify-between flex-wrap md:flex-nowrap gap-16 px-4 xl:px-0"
                >
                    <ul className="max-w-[400px]">
                        <li className="md:text-xl font-bold text-slate-200 mb-10 uppercase" >
                            The best sports facility platform
                        </li>
                        <li>
                            <p className="md:text-md">PlayTime Pro is an Sports Facility Booking platform, this is the best service in you Town, checkout our new services and best offers</p>
                        </li>
                    </ul>
                    <ul>
                        <li className="md:text-xl font-bold text-slate-200 mb-10 uppercase">Office</li>
                        <li className="font-bold mb-5 cursor-pointer  ">
                            Dhaka -
                            9786 <br /> 7th street, office 867 Dhaka
                        </li>
                        <li className="font-bold mb-5 cursor-pointer underline">
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                                <p>+98 872446367</p>
                            </div>
                        </li>
                        <li className="font-bold mb-5 cursor-pointer underline">
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                                </svg>

                                <p>playtime-pro@gmail.com</p>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li className="md:text-xl font-bold text-slate-200 mb-10 uppercase">Quick Link</li>
                        <li className="font-bold mb-5 cursor-pointer underline">
                            <NavLink to="/about-us">About Us</NavLink>
                        </li>
                        <li className="font-bold mb-5 cursor-pointer underline">
                            <NavLink to="/contact-us">Contact Us</NavLink>
                        </li>
                        <li className="font-bold mb-5 cursor-pointer underline">
                            Customer Support
                        </li>
                    </ul>
                    <ul>
                        <li className="md:text-xl font-bold text-slate-200 mb-10 uppercase">Get in touch</li>
                        <li className="font-bold mb-5 cursor-pointer underline">
                            <div className="flex items-center gap-1">
                                <Facebook size={16} />
                                <p>Facebook</p>
                            </div>
                        </li>
                        <li className="font-bold mb-5 cursor-pointer underline">
                            <div className="flex items-center gap-1">
                                <Twitter size={16} />
                                <p>Twitter</p>
                            </div>
                        </li>
                        <li className="font-bold mb-5 cursor-pointer underline">
                            <div className="flex items-center gap-1">
                                <Instagram size={16} />
                                <p>Instagram</p>
                            </div>
                        </li>
                        <li className="font-bold mb-5 cursor-pointer underline">
                            <div className="flex items-center gap-1">
                                <Youtube size={16} />
                                <p>Youtube</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto h-20 border-t border-slate-500 flex items-center px-4 xl:px-0">
                <h1 className="flex items-center text-slate-200"><span className="mr-3">PlayTime Pro</span> <Copyright size={14} /> <span className="m-1">{date}</span>. All right reversed</h1>
            </div>
        </footer >
    )
}

export default Footer;   