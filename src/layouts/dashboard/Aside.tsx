/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAppSelector } from "@/redux/hooks";
import { BaggageClaim, BookCheck, CircleOff, LayoutDashboard, ListCheck, ListPlus, MessageSquareQuote, NotebookPen, Plus, Settings2, ShieldPlus, ShoppingBasket, Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


const Aside = ({ isSidebarOpen, setIsSidebarOpen }: any) => {
    const [userRole, setUserRole] = useState(" ");
    const user = useAppSelector((state) => state?.auth?.user);


    useEffect(() => {
        setUserRole(user?.role as string);
    }, [user]);

    return (
        <aside
            className={
                `col-span-12 lg:col-span-4 xl:col-span-2 text-[18px] sm:text-[25px] bg-primary text-black min-h-screen sm:max-h-screen h-full w-full sticky top-0 z-50 ${isSidebarOpen ? "flex" : "hidden"
                }`
            }
        >
            <div
                className="relative p-8 w-full"
            >
                <NavLink to="/">
                    <h4 title="Back to Homepage" className="text-2xl md:text-3xl text-slate-200 lg:text-4xl font-extrabold">PlayTime Pro</h4>
                </NavLink>

                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed right-10 top-10 border rounded-full w-10 h-10 flex justify-center items-center lg:hidden bg-black text-white"
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

                <div className="mt-6 sm:mt-14 md:mt-16">
                    <Accordion type="single" collapsible className="w-full">
                        <NavLink to="/dashboard/home">
                            <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full mb-5 flex items-center gap-2">
                                <LayoutDashboard size={15} />   Dashboard
                            </button>
                        </NavLink>
                        {
                            (user && (userRole === "user")) && (
                                <>
                                    <NavLink to="/dashboard/my-bookings">
                                        <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full mb-5  flex items-center gap-2">
                                            <BookCheck size={15} />  My Bookings
                                        </button>
                                    </NavLink>
                                    <NavLink to="/dashboard/my-orders">
                                        <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full mb-5  flex items-center gap-2">
                                            <BaggageClaim size={15} /> My Orders
                                        </button>
                                    </NavLink>

                                    <NavLink to="/dashboard/my-reviews">
                                        <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full mb-5  flex items-center gap-2">
                                            <Star size={15} />  My Reviews
                                        </button>
                                    </NavLink>
                                    <NavLink to="/dashboard/my-cancelled-orders">
                                        <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full mb-5  flex items-center gap-2">
                                            <CircleOff size={15} />  Cancelled Orders
                                        </button>
                                    </NavLink>
                                    <NavLink to="/dashboard/my-testimonial">
                                        <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full mb-5  flex items-center gap-2">
                                            <MessageSquareQuote size={15} />  Testimonial
                                        </button>
                                    </NavLink>
                                </>
                            )
                        }

                        {
                            (user && (userRole === "admin")) && (
                                <>
                                    <NavLink to="/dashboard/add-admin">
                                        <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full mb-5  flex items-center gap-2">
                                            <ShieldPlus size={15} />
                                            Add Admin</button>
                                    </NavLink>

                                    <AccordionItem className="mb-5" value="item-1">
                                        <AccordionTrigger className="text-xs 2xl:text-sm bg-primary rounded-lg w-full  py-2 text-slate-200">
                                            <div className="flex items-center gap-2">
                                                <Trophy size={15} /> Facility Management
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary rounded-lg px-4 ">
                                            <NavLink to="/dashboard/add-facilities">
                                                <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full flex items-center gap-2"> <ListPlus size={15} /> Add Facility</button>
                                            </NavLink>
                                            <hr />
                                            <NavLink to="/dashboard/manage-facilities">
                                                <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full flex items-center gap-2"> <Settings2 size={15} />Manage Facilities</button>
                                            </NavLink>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem className="mb-5" value="item-3">
                                        <AccordionTrigger className="text-xs 2xl:text-sm bg-primary rounded-lg w-full  py-2 text-slate-200">
                                            <div className="flex items-center gap-2">
                                                <NotebookPen size={15} />  Booking Management
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary rounded-lg px-4 ">
                                            <NavLink to="/dashboard/manage-bookings">
                                                <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full flex items-center gap-2"><ListCheck size={15} /> All Bookings</button>
                                            </NavLink>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem className="mb-5" value="item-4">
                                        <AccordionTrigger className="text-xs 2xl:text-sm bg-primary rounded-lg w-full  py-2 text-slate-200">
                                            <div className="flex items-center gap-2">
                                                <ShoppingBasket size={15} />
                                                Product Management
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary rounded-lg px-4 ">
                                            <NavLink to="/dashboard/add-products">
                                                <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full flex items-center gap-2"> <Plus size={15} /> Add Products</button>
                                            </NavLink>
                                            <hr />
                                            <NavLink to="/dashboard/manage-products">
                                                <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left rounded-lg text-slate-200 w-full flex items-center gap-2"> <Settings2 size={15} /> Manage Products</button>
                                            </NavLink>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem className="mb-5" value="item-5">
                                        <AccordionTrigger className="text-xs 2xl:text-sm bg-primary rounded-lg w-full  py-2 text-slate-200">
                                            <div className="flex items-center gap-2">
                                                <BaggageClaim size={15} />
                                                Orders Management
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary px-4">
                                            <NavLink to="/dashboard/manage-orders">
                                                <button className=" font-semibold py-2 text-xs 2xl:text-sm bg-primary text-left text-slate-200 w-full flex items-center gap-2"> <ListCheck size={15} /> All Orders</button>
                                            </NavLink>
                                        </AccordionContent>
                                    </AccordionItem>
                                </>
                            )
                        }
                    </Accordion>
                </div>
            </div>
        </aside>
    );
};

export default Aside;