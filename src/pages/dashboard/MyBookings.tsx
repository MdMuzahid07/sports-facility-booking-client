/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

const MyBookings = () => {
    const { data: bookings } = useGetAllBookingsUserQuery(undefined);
    const [cancelBooking] = useCancelBookingMutation();

    const handleCancel = async (id: string) => {
        console.log(id, "booking id")
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
    }

    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                My Bookings
            </h1>
            <section className="mt-14">
                <Table className="bg-white rounded-lg">
                    <TableCaption>My Bookings</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Booking Status</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings?.data?.map((booking: any, index: any) => (
                            <TableRow key={booking?._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{"invoice"}</TableCell>
                                <TableCell>Pending</TableCell>
                                <TableCell>{booking?.facility?.name}</TableCell>
                                <TableCell>${booking?.payableAmount}</TableCell>
                                <TableCell>{booking?.isBooked}</TableCell>
                                <TableCell>{booking?.user?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Button disabled={!(booking?.isBooked === "confirmed")} onClick={() => handleCancel(booking?._id)}>Cancel</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </div>
    )
};

export default MyBookings;