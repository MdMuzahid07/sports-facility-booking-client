import { Button } from "@/components/ui/button"
import { navLinks } from "@/constants"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { useAppSelector } from "@/redux/hooks";
import CartDropdown from "@/cart/CartDropdown";

const Navbar = () => {
    const [isMobileNavOpen, setIsMobileAppOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [cartDrop, setCartDrop] = useState(false);

    const user = useAppSelector((state) => state.auth.user);

    const handleMobileNav = () => setIsMobileAppOpen(!isMobileNavOpen);


    // conditionality visible in invisible the button depending on minimum scroll bottom 500px
    const handleToggleVisible = () => {
        if (window.scrollY > 70) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // listening the scroll event and, calling the function
    useEffect(() => {
        window.addEventListener("scroll", handleToggleVisible);

        // cleanup function to prevent memory leaks // its clean the scroll event listener after component remove from the DOM
        return () => {
            window.removeEventListener("scroll", handleToggleVisible);
        }
    }, []);



    return (
        <header className={`bg-white border-b w-full sticky top-0 z-50 ${isVisible ? "bg-opacity-35 backdrop-blur" : ""}`}>
            <nav className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4 xl:px-0 relative">
                <div>
                    {/* <img className="w-1- h-10" src="" alt="" /> */}
                    <Link to="/">
                        <img className="w-32" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1734177436/qmyvxzex1jxwx8n14l7w.png" alt="" />
                        {/* <h1 className="md:text-2xl font-bold px-4 inline py-2 md:py-1 bg-[#171717] text-white">PlayTime Pro</h1> */}
                    </Link>
                </div>
                {/* // desktop menu starts =================>>>>>>>>>>>>>>>>> */}
                <div className="flex items-center gap-6">
                    <ul className="hidden lg:flex space-x-8">
                        {
                            navLinks?.map((nav) => <li className="font-bold uppercase text-lg" key={nav?.title}><NavLink to={nav?.path}>{nav?.title}</NavLink></li>)
                        }
                    </ul>
                    <CartDropdown cartDrop={cartDrop} setCartDrop={setCartDrop} />
                    {
                        user?.role ? <UserDropdown /> : <NavLink to="/login">
                            <Button className="hidden md:flex rounded-full md:text-xl">
                                Login
                            </Button>
                        </NavLink>
                    }
                    <Button
                        onClick={handleMobileNav}
                        className="flex lg:hidden rounded-none md:text-xl"
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
                    isMobileNavOpen && <div className="flex lg:hidden w-full sm:w-[350px] h-screen p-8 top-20 bg-[#171717] text-white absolute right-0">
                        <ul className="space-y-8 mt-10">
                            {
                                navLinks?.map((nav) => <li onClick={() => setIsMobileAppOpen(false)} className="font-bold uppercase text-lg w-full" key={nav?.title}><NavLink to={nav?.path}>{nav?.title}</NavLink></li>)
                            }


                            <section className="mt-10">
                                {
                                    user?.role ? <UserDropdown /> : <NavLink to="/login">
                                        <Button className="md:hidden flex rounded-none bg-slate-100 text-primary text-xl">
                                            Login
                                        </Button>
                                    </NavLink>
                                }
                            </section>
                        </ul>
                    </div>
                }
                {/* // mobile menu end  =================>>>>>>>>>>>>>>>>> */}
            </nav>
        </header >
    )
};

export default Navbar;