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
import { Checkbox } from "@/components/ui/checkbox";
import { useCheckAvailabilityQuery } from "@/redux/features/bookings/bookingsApi";
import { useGetASingleFacilityQuery } from "@/redux/features/facilities/facilityApi";
const img = "https://res.cloudinary.com/dymo0iyee/image/upload/v1725689329/1752_x3nrjw.jpg"


const FacilityBooking = () => {
    const { bookById } = useParams();
    const [date, setDate] = useState<Date>();
    const [formattedDate, setFormattedDate] = useState();
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


    return (
        <div className="bg-slate-200 py-32">
            <section className="max-w-7xl mx-auto px-4 xl:px-0">
                <h3 className="text-3xl md:text-5xl font-extrabold mb-5">Booking</h3>
                <div className="grid grid-cols-1 lg:grid-cols-5 w-full min-h-[500px] bg-slate-100">
                    <div className="col-span-3 bg-white">
                        <div className="col-span-3 flex justify-center items-center">
                            <div className="w-full">
                                <Zoom>
                                    <img
                                        src={facilityData?.data?.image}
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
                                <p className="text-xl">
                                    {facilityData?.data?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 p-10">
                        <h3 className="text-xl md:text-2xl font-extrabold mb-2">Check Availability</h3>
                        <div className="mt-5">
                            <div>
                                <label className="text-xl" htmlFor="">Select Date</label>
                                <br />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal rounded-none",
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
                            </div>
                            <div className="mt-10">
                                <h1 className="text-xl mb-3">Available Slots ({availableSlots?.data?.length})</h1>
                                <div className="flex items-center justify-between">
                                    <Badge className="max-w-44 w-full rounded-none py-1.5 text-lg">Start Time</Badge>
                                    <MoveRight />
                                    <Badge className="max-w-44 w-full rounded-none py-1.5 text-lg">End Time</Badge>
                                </div>
                            </div>
                            <hr className="my-5 border-t border-black" />
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <p className="text-xl">Start Time</p>
                                    <p className="text-xl">End Time</p>
                                </div>
                                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                                    {
                                        availableSlots?.data?.map((slots: any) => (
                                            <div key={slots?._id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="terms" />
                                                    <label
                                                        htmlFor="terms"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {slots?.startTime}
                                                    </label>
                                                </div>
                                                <MoveRight />
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="terms" />
                                                    <label
                                                        htmlFor="terms"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {slots?.endTime}
                                                    </label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="flex justify-end">
                                    <Button className="mt-10 rounded-none text-lg space-x-2">
                                        <span>
                                            Proceed to Pay
                                        </span>
                                        <ArrowRight />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default FacilityBooking;