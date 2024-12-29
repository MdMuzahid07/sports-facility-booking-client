import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { MoveRight } from "lucide-react";

const Hero = () => {
    const navigate = useNavigate();


    return (
        <section className="h-[100vh] max-h-[800px] 2xl:max-h-[850px] w-full bg-cover bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/dymo0iyee/image/upload/v1725689329/1752_x3nrjw.jpg')]">
            <div className="bg-black bg-opacity-50 w-full h-[100vh] max-h-[800px] 2xl:max-h-[850px] text-slate-200">
                <div className="max-w-7xl mx-auto px-4 xl:px-0 flex items-center h-full">
                    <div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold  bg-[#171717] px-4 inline rounded-2xl">PlayTime Pro</h1>
                        <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-extrabold mb-10 mt-10">Unlock Your Sports Experience with Ease</h3>
                        <p className="text-xl md:text-2xl lg:text-3xl">Your trusted partner for hassle-free sports facility bookings.Enjoy seamless access to top-notch courts, fields, and gyms—just a click away.</p>
                        <Button onClick={() => navigate("/facilities")} className="mt-6 px-6 rounded-full text-2xl md:text-3xl">Book Now <MoveRight className="ml-3" /></Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;