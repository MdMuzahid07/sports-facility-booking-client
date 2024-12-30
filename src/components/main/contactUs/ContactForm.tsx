/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Mail, MailOpen, MapPin, Notebook, Pencil, Phone, PhoneCall, User } from "lucide-react";

const ContactForm = () => {

    const handleSubmit = (e: any) => {
        e.preventDefault();


    };


    return (
        <section className="grid md:grid-cols-2 gap-8">

            <div className="space-y-6">
                <div className="mb-10">
                    <h3 className="text-3xl md:text-5xl font-bold mb-5">Contact Us</h3>
                    <p className="text-xl md:text-2xl lg:text-3xl">We'd love to hear from you!</p>
                </div>

                <div>
                    <div className="mb-4">
                        <p className="text-xl md:text-2xl flex items-center gap-2"><MapPin size={20} />  <span>Office Address:</span></p>
                        <p className="text-xl md:text-2xl">Dhaka - 9786
                            7th street, office 867 Dhaka</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-xl md:text-2xl flex items-center gap-2"><Phone size={20} /> <span>Phone:</span></p>
                        <p className="text-xl md:text-2xl">+123-456-7890</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-xl md:text-2xl flex items-center gap-2"><MailOpen size={20} /> <span>Email:</span></p>
                        <p className="text-xl md:text-2xl">info@company.com</p>
                    </div>
                </div>
            </div>

            <div>
                <CardContent className="p-0">
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label className=" flex items-center gap-2" htmlFor="name">
                                        <span><User /></span>
                                        <span>Name</span>
                                    </Label>
                                    <Input className="rounded-full drop-shadow-sm bg-slate-100" id="name" placeholder="Name of your project" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label className=" flex items-center gap-2" htmlFor="mail">
                                        <span><Mail /></span>
                                        <span>Email</span>
                                    </Label>
                                    <Input type="email" className="rounded-full drop-shadow-sm bg-slate-100" id="mail" placeholder="Name of your project" />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label className=" flex items-center gap-2" htmlFor="phone">
                                        <span><PhoneCall /></span>
                                        <span>Phone</span>
                                    </Label>
                                    <Input className="rounded-full drop-shadow-sm bg-slate-100" id="phone" placeholder="Name of your project" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label className=" flex items-center gap-2" htmlFor="subject">
                                        <span><Notebook /></span>
                                        <span>Subject</span>
                                    </Label>
                                    <Input className="rounded-full drop-shadow-sm bg-slate-100" id="subject" placeholder="Name of your project" />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label className=" flex items-center gap-2" htmlFor="subject">
                                    <span><Pencil /></span>
                                    <span>How can we help you, feel free to get in touch</span>
                                </Label>
                                <textarea className="w-full rounded-2xl border-none drop-shadow-sm bg-slate-100 mt-2" rows={4} name="" id=""></textarea>
                            </div>

                            <Button type="submit" className="rounded-full drop-shadow-sm mt-5 text-lg">Submit</Button>
                        </div>
                    </form>
                </CardContent>

            </div>
        </section>
    )
};

export default ContactForm;