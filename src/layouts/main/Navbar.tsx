import { Button } from "@/components/ui/button"
import { navLinks } from "@/constants"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isMobileNavOpen, setIsMobileAppOpen] = useState(false);

    const handleMobileNav = () => setIsMobileAppOpen(!isMobileNavOpen);



    return (
        <header className="bg-white border-b w-full sticky top-0">
            <nav className="max-w-screen-2xl mx-auto flex justify-between items-center h-20 px-4 xl:px-0 relative">
                <div>
                    {/* <img className="w-1- h-10" src="" alt="" /> */}
                    <Link to="/">
                        <h1 className="md:text-2xl font-bold px-4 inline py-2 md:py-1 bg-[#171717] text-white">PlayTime Pro</h1>
                    </Link>
                </div>
                {/* // desktop menu starts =================>>>>>>>>>>>>>>>>> */}
                <div className="flex items-center gap-6">
                    <ul className="hidden md:flex space-x-8">
                        {
                            navLinks?.map((nav) => <li className="font-bold uppercase text-lg" key={nav?.title}><NavLink to={nav?.path}>{nav?.title}</NavLink></li>)
                        }
                    </ul>
                    <Button className="hidden md:flex rounded-none md:text-xl">Login</Button>
                    <Button
                        onClick={handleMobileNav}
                        className="flex md:hidden rounded-none md:text-xl"
                    >
                        {
                            isMobileNavOpen
                                ?
                                < X />
                                :
                                <Menu />
                        }
                    </Button>
                </div>
                {/* // desktop menu end =================>>>>>>>>>>>>>>>>> */}

                {/* // mobile menu starts =================>>>>>>>>>>>>>>>>> */}
                {
                    isMobileNavOpen && <div className="flex md:hidden w-full sm:w-[350px] h-screen p-8 top-20 bg-[#171717] text-white absolute right-0">
                        <ul className="space-y-8 mt-10">
                            {
                                navLinks?.map((nav) => <li className="font-bold uppercase text-lg" key={nav?.title}><NavLink to={nav?.path}>{nav?.title}</NavLink></li>)
                            }
                        </ul>
                    </div>
                }
                {/* // mobile menu end  =================>>>>>>>>>>>>>>>>> */}
            </nav>
        </header >
    )
}

export default Navbar;