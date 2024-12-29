/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllBookingsAdminQuery } from "@/redux/features/bookings/bookingsApi";

const ManageBookings = () => {
    const { data: bookings } = useGetAllBookingsAdminQuery(undefined);
    // const handleCancel = () => {
    //     const isProceed = window.confirm("Cancel Order");
    //     if (isProceed) {
    //         toast.success("Order cancelled successfully")
    //     }
    // }


    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl font-bold">
                Manage Bookings
            </h1>
            <section className="mt-6">
                <Table className="bg-white rounded-2xl drop-shadow-sm">
                    <TableCaption>All Bookings</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Booking Status</TableHead>
                            {/* <TableHead>Username</TableHead> */}
                            <TableHead className="text-right">Username</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings?.data?.map((booking: any, index: any) => (
                            <TableRow key={booking?._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>
                                    <img className="w-12 h-12 rounded-full object-cover object-center" src={booking?.facility?.image?.[0]} alt="" />
                                </TableCell>
                                <TableCell>Pending</TableCell>
                                <TableCell>{booking?.facility?.name}</TableCell>
                                <TableCell>${booking?.payableAmount}</TableCell>
                                <TableCell>
                                    <Badge>{booking?.isBooked}</Badge>
                                </TableCell>
                                <TableCell className="font-bold">{booking?.user?.name}</TableCell>
                                {/* <TableCell className="text-right">
                                    <Button onClick={() => handleCancel()}>Cancel</Button>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </div>
    )
};

export default ManageBookings;