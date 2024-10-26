import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Quote } from "lucide-react";
import { memo } from "react";

const TestimonialCard = () => {
    return (
        <div className="mx-4 h-[200px] overflow-hidden border-2 border-[#2B2C2D] relative p-4 bg-slate-200">
            <p className="flex gap-2 text-md">
                <span><Quote /></span>
                The customer service I received was exceptional. The support team went above and beyond to address my concerns.</p>

            <div className="absolute bottom-4 left-4">
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage className="w-9 h-9 object-cover object-center overflow-hidden rounded-full" src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>Image</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-md font-semibold  leading-4 text-[#2B2C2C]">John Doe</h1>
                        <p className="leading-4 text-xs">ceo of x</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default memo(TestimonialCard);