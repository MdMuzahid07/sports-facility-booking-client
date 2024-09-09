/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

const Header = ({ isSidebarOpen, setIsSidebarOpen }: any) => {

    const handleUserLogout = () => {

    };

    return (
        <header className="w-full h-20 bg-[slate-100] sticky top-0 left-0 text-primary border-b px-7 flex justify-between items-center z-20">
            <div className="flex items-center gap-4">
                <button
                    className={`${!isSidebarOpen ? "bg-green-500" : "bg-red-500 "
                        } text-white px-4 py-1.5 border tracking-wider flex items-center gap-2`}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? (
                        <p className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5 8.25 12l7.5-7.5"
                                />
                            </svg>
                            Close
                        </p>
                    ) : (
                        <p className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                            </svg>
                            Open
                        </p>
                    )}
                </button>
                <Link
                    to="/"
                    className="hidden md:block bg-[#171717] text-white px-4 py-1.5 border tracking-wider"
                >
                    Homepage
                </Link>
            </div>
            {/* {user && ( */}
            <p className="bg-[#171717] text-white hidden md:block px-4 py-1.5 border tracking-wider">
                Hello: John
            </p>
            {/* )} */}
            <button
                className="bg-[#171717] text-white flex items-center gap-2 px-4 py-1.5 border tracking-wider"
                onClick={handleUserLogout}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                </svg>
                <span>Logout</span>
            </button>
        </header>
    )
};

export default Header;