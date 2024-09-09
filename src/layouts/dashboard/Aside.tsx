/* eslint-disable @typescript-eslint/no-explicit-any */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NavLink } from "react-router-dom";


const Aside = ({ isSidebarOpen, setIsSidebarOpen }: any) => {

    return (
        <aside className={
            `${isSidebarOpen ? "flex" : "hidden"
            } col-span-12 md:col-span-4 lg:col-span-2 text-[18px] sm:text-[25px] bg-slate-200 text-black min-h-screen sm:max-h-screen h-full w-full sticky top-0 border-r z-50
            `
        }>
            <div
                className="relative p-8 w-full"
            >
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">PlayTime Pro</h4>

                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed right-10 top-10 border rounded-full w-10 h-10 flex justify-center items-center md:hidden bg-black text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="mt-6 sm:mt-14 md:mt-16 border-t">
                    <Accordion type="single" collapsible className="w-full">

                        <NavLink to="/dashboard/home">
                            <button className="px-4 font-semibold py-2 text-lg bg-white text-left rounded-lg text-[#000000] w-full mb-7">
                                Dashboard
                            </button>
                        </NavLink>

                        <NavLink to="/dashboard/my-bookings">
                            <button className="px-4 font-semibold py-2 text-lg bg-white text-left rounded-lg text-[rgb(0,0,0)] w-full mb-7">
                                My Bookings
                            </button>
                        </NavLink>

                        <NavLink to="/dashboard/add-admin">
                            <button className="px-4 font-semibold py-2 text-lg bg-white text-left rounded-lg text-[#000000] w-full mb-7">Add Admin</button>
                        </NavLink>

                        <AccordionItem className="mb-7" value="item-1">
                            <AccordionTrigger className="text-lg bg-white rounded-lg w-full px-4 py-2">Facility Management</AccordionTrigger>
                            <AccordionContent className="bg-white rounded-lg p-4 mt-3">
                                <NavLink to="/dashboard/add-facilities">
                                    <button className="px-4 font-semibold py-2 text-lg bg-slate-200 text-left rounded-lg text-[#000000] w-full mb-7">Add Facility</button>
                                </NavLink>
                                <hr />
                                <NavLink to="/dashboard/manage-facilities">
                                    <button className="px-4 font-semibold py-2 text-lg bg-slate-200 text-left rounded-lg text-[#000000] w-full">Manage Facilities</button>
                                </NavLink>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem className="mb-7" value="item-3">
                            <AccordionTrigger className="text-lg bg-white rounded-lg w-full px-4 py-2">Booking Management</AccordionTrigger>
                            <AccordionContent className="bg-white rounded-lg p-4 mt-3">
                                <NavLink to="/dashboard/manage-bookings">
                                    <button className="px-4 font-semibold py-2 text-lg bg-slate-200 text-left rounded-lg text-[#000000] w-full">All Bookings</button>
                                </NavLink>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </aside>
    );
};

export default Aside;