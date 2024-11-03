/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Quote } from "lucide-react";
import { memo } from "react";

const TestimonialCard = ({ testimonial }: any) => {

    return (
        <section className="mx-4 h-[170px] overflow-hidden border-2 border-[#2B2C2D] relative p-4 bg-slate-200">
            <p className="flex gap-2 text-md">
                <span><Quote /></span>
                {testimonial?.testimonialText}</p>

            <div className="absolute bottom-4 left-4">
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage className="w-9 h-9 object-cover object-center overflow-hidden rounded-full" src={testimonial?.image} alt="@shadcn" />
                        <AvatarFallback>Image</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-md font-semibold  leading-4 text-[#2B2C2C]">{testimonial?.name}</h1>
                        <p className="leading-4 text-xs">{testimonial?.occupation}</p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default memo(TestimonialCard);