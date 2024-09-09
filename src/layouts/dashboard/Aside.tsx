/* eslint-disable @typescript-eslint/no-explicit-any */

const Aside = ({ isSidebarOpen, setIsSidebarOpen }: any) => {

    return (
        <div
            className={
                `${isSidebarOpen ? "flex" : "hidden"
                } col-span-12 sm:col-span-4 lg:col-span-2 text-[18px] sm:text-[25px] md:text-[40px] font-bold bg-[#171717] p-7 text-white min-h-screen w-full relative`
            }
        >
            <button
                onClick={() => setIsSidebarOpen(false)}
                className="fixed right-10 top-10 border rounded-full w-10 h-10 flex justify-center items-center md:hidden"
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
            <ul className="fixed top-10">
                <li className="mb-4">

                </li>
                <li className="mb-4">

                </li>
            </ul>
        </div>
    );
}

export default Aside