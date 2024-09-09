import { Outlet } from "react-router-dom"
import Aside from "./Aside";
import Header from "./Header";
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            {
                isLoading ? (<Preloader />) : (
                    <>
                        <div className="grid grid-cols-12 h-full w-full relative">
                            <Aside
                                isSidebarOpen={isSidebarOpen}
                                setIsSidebarOpen={setIsSidebarOpen}
                            />
                            <div
                                className={
                                    `${isSidebarOpen
                                        ? "col-span-12 md:col-span-8 lg:col-span-10"
                                        : "col-span-12"
                                    }`
                                }
                            >
                                <Header
                                    setIsSidebarOpen={setIsSidebarOpen}
                                    isSidebarOpen={isSidebarOpen}
                                />
                                <div className="bg-slate-100">
                                    <div
                                        className={`sm:px-16 px-6 ${isSidebarOpen ? "max-w-7xl" : "max-w-screen-2xl"
                                            } min-h-screen w-full mx-auto `}
                                    >
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default DashboardLayout;