import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // conditionality visible in invisible the button depending on minimum scroll bottom 500px
    const handleToggleVisible = () => {
        if (window.scrollY > 500) {
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


    // main part of this component
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {
                isVisible && <Button onClick={scrollTop} className="rounded-none fixed bottom-7 right-4">
                    <ArrowUp />
                </Button >
            }
        </>
    )
};

export default ScrollToTop;