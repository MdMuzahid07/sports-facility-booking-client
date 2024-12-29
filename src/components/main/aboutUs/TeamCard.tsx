/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { memo } from "react";

const TeamCard = ({ team }: any) => {
    return (
        <div className="md:grid md:grid-cols-7 rounded-2xl overflow-hidden bg-slate-100 border-2 hover:border-[#171717]  transition ease-in delay-50">
            <div className="md:col-span-3 w-full h-[200px] sm:h-[250px] md:h-[300px]">
                <img className="h-full w-full object-cover" src={team?.image} alt="" />
            </div>
            <div className="md:col-span-4 px-6 pt-8 relative">
                <h1 className="text-2xl font-bold">{team?.name}</h1>
                <p className="text-md">{team?.bio}</p>

                <p className="mt-2 md:mt-4 text-xs md:text-[16px] leading-relaxed">
                    {team?.about?.slice(0, 130)}
                </p>

                <div className="md:absolute md:bottom-0 md:left-4 pt-6 pb-8">
                    <div className="flex items-center gap-4">
                        <Button className="rounded-xl">
                            <Facebook />
                        </Button>
                        <Button className="rounded-xl">
                            <Twitter />
                        </Button>
                        <Button className="rounded-xl">
                            <Linkedin />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(TeamCard);