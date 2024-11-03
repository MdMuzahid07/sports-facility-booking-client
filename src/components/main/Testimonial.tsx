/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import Slider from "react-slick";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { useGetAllTestimonialsQuery } from "@/redux/features/testimonial/testimonialApi";

const Testimonial = () => {
    const sliderRef = useRef<Slider>(null);
    const { data: testimonials } = useGetAllTestimonialsQuery(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="bg-slate-200 border-t border-primary">
            <div className="max-w-[1312px] mx-auto py-28">
                <div className="pl-4">
                    <h3 className="text-3xl md:text-5xl font-extrabold mb-5">Testimonials </h3>
                    <p className="text-xl md:text-2xl lg:text-3xl">What our client says</p>
                </div>
                <div className="flex items-center justify-end mb-5 mr-4">
                    <div className="flex items-center space-x-6">
                        <Button onClick={() => sliderRef.current?.slickPrev()} className="rounded-none">
                            <ChevronLeft />
                        </Button>
                        <Button onClick={() => sliderRef.current?.slickNext()} className="rounded-none">
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
                <div className="slider-container">
                    <Slider ref={sliderRef} arrows={false} {...settings}>
                        {
                            testimonials?.data?.map((testimonial: any) => (
                                <TestimonialCard testimonial={testimonial} key={testimonial?._id} />
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};


export default Testimonial;