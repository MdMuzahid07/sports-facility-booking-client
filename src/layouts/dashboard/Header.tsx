/* eslint-disable @typescript-eslint/no-explicit-any */

import UserDropdownDashboard from "@/components/dashboard/UserDropdownDashboard";
import { AlignJustify, AlignLeft } from "lucide-react";

const Header = ({ isSidebarOpen, setIsSidebarOpen }: any) => {


    return (
        <header className="w-full bg-white h-20 bg-[slate-100] sticky top-0 left-0 text-primary border-b px-7 flex justify-between items-center z-20">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? (
                        <p className="flex items-center gap-2">
                            <AlignLeft />
                        </p>
                    ) : (
                        <AlignJustify />
                    )}
                </button>
            </div>

            <UserDropdownDashboard />
        </header>
    )
};

export default Header;