/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddTestimonialMutation } from "@/redux/features/testimonial/testimonialApi";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { toast } from "sonner";

const MyTestimonial = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [occupation, setOccupation] = useState("");
    const [testimonialText, setTestimonialText] = useState("");
    const [addTestimonial, { data, isLoading, error }] = useAddTestimonialMutation();


    const handleSubmit = async () => {
        const data = await {
            name: user?.email.split("@")[0],
            email: user?.email,
            occupation: occupation,
            testimonialText: testimonialText,
            image: "https://res.cloudinary.com/dlxfcyc7x/image/upload/v1729976728/mymb14klmvr1zmqya7ux.jpg",
        };

        try {
            await addTestimonial(data);
        } catch (error) {
            console.log(error, "this error from catch");
        }
    };

    if (isLoading) {
        toast.loading("Working...", { id: "testimonialToastId" });
    }
    if (error) {
        toast.error((error as any)?.data?.message, { id: "testimonialToastId" });
    }
    if (data && data?.success) {
        toast.success("Done", { id: "testimonialToastId" });
    }


    return (
        <section className="py-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold mb-14">
                Share Your Testimonial
            </h1>
            <div className="bg-white w-full p-8 rounded-lg">
                <section className="space-y-6">
                    <div>
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input
                            id="occupation"
                            name="occupation"
                            type="text"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            placeholder="CEO of Space X"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="testimonialText">Testimonial</Label>
                        <Textarea
                            id="testimonialText"
                            name="testimonialText"
                            value={testimonialText}
                            onChange={(e) => setTestimonialText(e.target.value)}
                            placeholder="Write your testimonial here"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleSubmit} className="text-lg">
                            Post
                        </Button>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default MyTestimonial;
