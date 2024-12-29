/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useCancelBookingMutation, useGetAllBookingsUserQuery } from "@/redux/features/bookings/bookingsApi";
import { CircleOff, Settings, SquareArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MyBookings = () => {
    const { data: bookings, isLoading } = useGetAllBookingsUserQuery(undefined);
    const [cancelBooking] = useCancelBookingMutation();
    const navigate = useNavigate();

    const handleCancel = async (id: string) => {
        const isProceed = window.confirm("Cancel Order");
        try {
            if (isProceed) {
                const res = await cancelBooking(id).unwrap();
                if (res?.success) {
                    toast.success("Booking cancelled successfully!");
                }
            }
        } catch (error) {
            console.log({ errorFromCatch: error });
        }
    };


    const handleViewBookingDetails = (id: string) => {
        navigate(`/dashboard/my-booking-details/${id}`)
    };


    if (!bookings && isLoading) {
        return <LoadingSpinner />
    }


    console.log(bookings)

    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl font-bold">
                My Bookings
            </h1>
            <section className="mt-6">
                <Table className="bg-white rounded-lg">
                    <TableCaption>My Bookings</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Booking Status</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings?.data?.map((booking: any, index: any) =>
                            <TableRow key={booking?._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>
                                    <img className="w-12 h-12 rounded-full object-cover object-center" src={booking?.facility?.image?.[0]} alt="" />
                                </TableCell>
                                <TableCell>Pending</TableCell>
                                <TableCell>{booking?.facility?.name}</TableCell>
                                <TableCell>${booking?.payableAmount}</TableCell>
                                <TableCell>
                                    <Badge variant="outline"
                                        className={`${booking?.isBooked === "confirmed" ? "bg-green-500" : "bg-red-500"}  `}
                                    >
                                        {booking?.isBooked}
                                    </Badge>
                                </TableCell>
                                <TableCell><span className="capitalize">{booking?.user?.name}</span></TableCell>
                                <TableCell className="text-right">
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="flex rounded-full items-center gap-2">
                                                    <span>
                                                        <Settings size={15} />
                                                    </span>
                                                    <span>
                                                        Options
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56">
                                                <DropdownMenuLabel className="font-bold">
                                                    Appearance
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />

                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem
                                                        onClick={() => handleViewBookingDetails(booking?._id)}
                                                        className="font-bold"
                                                        disabled={!(booking?.isBooked === "confirmed")}
                                                    >
                                                        <SquareArrowUpRight className="mr-2 h-4 w-4" />
                                                        <span>View Details</span>
                                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        disabled={!(booking?.isBooked === "confirmed")}
                                                        onClick={() => handleCancel(booking?._id)}
                                                        className="font-bold"
                                                    >
                                                        <CircleOff className="mr-2 h-4 w-4" />
                                                        <span>{
                                                            booking?.isBooked === "confirmed"
                                                                ? "Cancel Booking" : "Booking Canceled"
                                                        }</span>
                                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableCell>
                            </TableRow>
                        )
                        }
                    </TableBody>
                </Table>
            </section>
        </div>
    )
};

export default MyBookings;