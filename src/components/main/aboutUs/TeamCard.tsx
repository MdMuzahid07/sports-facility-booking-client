import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { memo } from "react";

const TeamCard = () => {
    return (
        <div className="md:grid md:grid-cols-7 bg-slate-100 border-2 hover:border-[#171717]  transition ease-in delay-50">
            <div className="md:col-span-3 w-full h-[200px] sm:h-[250px] md:h-[300px]">
                <img className="h-full w-full object-cover" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725725369/2150465472_h8vplw.jpg" alt="" />
            </div>
            <div className="md:col-span-4 px-6 pt-8 relative">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-md">Ceo & Cto</p>

                <p className="mt-2 md:mt-4 text-xs md:text-[16px] leading-relaxed">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis animi ipsam velit. Incidunt est ad veritatis quisquam ipsam repudiandae explicabo?
                </p>

                <div className="md:absolute md:bottom-0 md:left-4 pt-6 pb-8">
                    <div className="flex items-center gap-4">
                        <Button className="rounded-none">
                            <Facebook />
                        </Button>
                        <Button className="rounded-none">
                            <Twitter />
                        </Button>
                        <Button className="rounded-none">
                            <Linkedin />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(TeamCard);