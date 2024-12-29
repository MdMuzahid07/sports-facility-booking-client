/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { ArrowRight, DollarSign, MapPin, MoveRight } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useCheckAvailabilityQuery, useCreateBookingMutation } from "@/redux/features/bookings/bookingsApi";
import { useGetASingleFacilityQuery } from "@/redux/features/facilities/facilityApi";
import { toast } from "sonner";
import ScrollToTop from "@/components/ScrollToTop";
import { Helmet } from "react-helmet-async";

const FacilityBooking = () => {
    const { bookById } = useParams();
    const [date, setDate] = useState<Date>();
    const [selectedStartTime, setSelectedStartTime] = useState(" ");
    const [selectedEndTime, setSelectedEndTime] = useState(" ");
    const [formattedDate, setFormattedDate] = useState();
    const [createBooking, { isLoading, error, data }] = useCreateBookingMutation();
    const { data: availableSlots } = useCheckAvailabilityQuery(
        { date: formattedDate, id: bookById },
        { skip: !formattedDate && !bookById }
    );
    const { data: facilityData } = useGetASingleFacilityQuery(bookById);
    const handleDateSelect = (selectedDate: any) => {
        if (selectedDate) {
            // Format the date to YYYY-MM-DD
            const formatted = selectedDate.toISOString().split("T")[0];
            setFormattedDate(formatted);
            setDate(selectedDate);
        }
    };

    const handleStartTimeSelect = (event: React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        setSelectedStartTime(target.value);
    };

    const handleEndTimeSelect = (event: React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        setSelectedEndTime(target.value);
    };

    const handleBooking = async () => {
        const bookingData = {
            facility: bookById,
            date: formattedDate,
            startTime: selectedStartTime,
            endTime: selectedEndTime
        }
        console.log(bookingData)
        try {
            const res = await createBooking(bookingData).unwrap();
            if (res?.success) {
                window.location.href = res?.data?.paymentSession?.payment_url;
            }
        } catch (error) {
            toast.error(`${(error as any)?.error}`, { id: "createBookingByUserToastId" });
        }
    };



    if (isLoading) {
        toast.loading("Booking...", { id: "createBookingByUserToastId" });
    }

    if (error) {
        toast.error((error as any)?.data?.message, { id: "createBookingByUserToastId" });
    }

    if (data && data?.success) {
        toast.success("Done", { id: "createBookingByUserToastId" });
    }


    return (
        <>
            <Helmet>
                <title>PlayTime Pro | Facility Booking</title>
                <meta
                    name="description"
                    content="sports equipments, product details page"
                />
            </Helmet>

            <section className="bg-slate-200 pt-20 pb-32">
                <section className="max-w-7xl mx-auto px-4 xl:px-0">
                    <h3 className="text-3xl md:text-5xl font-bold mb-5">Booking</h3>
                    <section className="grid grid-cols-1 lg:grid-cols-5 w-full min-h-[500px] bg-slate-100 rounded-2xl overflow-hidden drop-shadow-sm">
                        <div className="col-span-3 bg-white">
                            <div className="col-span-3 flex justify-center items-center">
                                <div className="w-full">
                                    <Zoom>
                                        <img
                                            src={facilityData?.data?.image?.[0]}
                                            alt="image"
                                            className="w-full h-auto max-h-[500px] object-cover shadow-lg"
                                        />
                                    </Zoom>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl md:text-2xl font-extrabold mb-2">{facilityData?.data?.name}</h3>
                                <div className="flex items-center gap-2">
                                    <p className="text-xl flex items-center gap-2">
                                        <span><MapPin size={20} /></span>
                                        <span>{facilityData?.data?.location}</span>
                                    </p>
                                    <p className="text-xl flex items-center gap-2">
                                        <span><DollarSign size={20} /></span>
                                        <span>{facilityData?.data?.pricePerHour} hour</span>
                                    </p>
                                </div>
                                <div className="mt-3">
                                    {facilityData?.data?.description ? (
                                        <article className="prose lg:prose-xl">
                                            <div
                                                className="w-full"
                                                dangerouslySetInnerHTML={{ __html: facilityData?.data?.description }}
                                            />
                                        </article>
                                    ) : (
                                        <p>No content available for this blog.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <section className="col-span-2 p-10">
                            <h3 className="text-xl md:text-2xl font-extrabold mb-2">Check Availability</h3>
                            <div className="mt-5">
                                <section>
                                    <label className="text-xl" htmlFor="">Select Date</label>
                                    <br />
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal rounded-full drop-shadow-sm",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full rounded-none p-0">
                                            <Calendar
                                                className="rounded-none]"
                                                mode="single"
                                                selected={date}
                                                onSelect={handleDateSelect}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </section>
                                <section className="mt-10">
                                    <h1 className="text-xl mb-3">Available Slots ({availableSlots?.data?.length})</h1>
                                    <div className="flex items-center justify-between">
                                        <Badge className="max-w-44 w-full rounded-full py-1.5 text-lg">Start Time</Badge>
                                        <MoveRight />
                                        <Badge className="max-w-44 w-full rounded-full py-1.5 text-lg">End Time</Badge>
                                    </div>
                                </section>
                                <hr className="my-5 border-t border-black" />
                                <section>
                                    <section className="flex items-center justify-between mb-5">
                                        <p className="text-xl">Start Time</p>
                                        <p className="text-xl">End Time</p>
                                    </section>
                                    <section className="space-y-4 max-h-[400px] overflow-y-auto">
                                        {availableSlots?.data?.map((slots: any, index: number) => (
                                            <div key={slots?._id + Math.random()} className="flex items-center justify-between cursor-pointer">
                                                {/* Start Time Selection */}
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="startTime"
                                                        onClick={handleStartTimeSelect}
                                                        value={slots?.startTime}
                                                        checked={selectedStartTime === slots?.startTime} // Allow only one start time selection
                                                        className="radio cursor-pointer"
                                                        id={`startTime-${index}`}
                                                    />
                                                    <label
                                                        htmlFor={`startTime-${index}`}
                                                        className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {slots?.startTime}
                                                    </label>
                                                </div>
                                                <MoveRight />
                                                {/* End Time Selection */}
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        name="endTime"
                                                        onClick={handleEndTimeSelect}
                                                        value={slots?.endTime}
                                                        checked={selectedEndTime === slots?.endTime} // Allow only one end time selection
                                                        className="radio"
                                                        id={`endTime-${index}`}
                                                    />
                                                    <label
                                                        htmlFor={`endTime-${index}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {slots?.endTime}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </section>


                                    <section className="flex justify-end">
                                        <Button onClick={handleBooking} className="mt-10 rounded-full text-lg space-x-2">
                                            <span>
                                                Confirm Booking
                                            </span>
                                            <ArrowRight />
                                        </Button>
                                    </section>
                                </section>
                            </div>
                        </section>
                    </section>
                </section>

                <ScrollToTop />
            </section>

        </>

    )
};

export default FacilityBooking;