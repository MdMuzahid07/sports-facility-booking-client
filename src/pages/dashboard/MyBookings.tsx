/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllBookingsUserQuery } from "@/redux/features/bookings/bookingsApi";
import { toast } from "sonner";

// const bookings = [
//     {
//         invoice: "INV-011",
//         paymentStatus: "Refunded",
//         name: "Alice Johnson",
//         price: 399.99,
//         userId: 98765,
//     },
//     {
//         invoice: "INV-012",
//         paymentStatus: "Pending",
//         name: "Bob Smith",
//         price: 149.99,
//         userId: 54321,
//     },
//     {
//         invoice: "INV-013",
//         paymentStatus: "Paid",
//         name: "Charlie Brown",
//         price: 299.99,
//         userId: 78901,
//     },
//     {
//         invoice: "INV-014",
//         paymentStatus: "Overdue",
//         name: "David Lee",
//         price: 179.99,
//         userId: 32109,
//     },
//     {
//         invoice: "INV-015",
//         paymentStatus: "Paid",
//         name: "Emily Wilson",
//         price: 229.99,
//         userId: 87654,
//     },
//     {
//         invoice: "INV-016",
//         paymentStatus: "Pending",
//         name: "Frank Taylor",
//         price: 199.99,
//         userId: 43210,
//     },
//     {
//         invoice: "INV-017",
//         paymentStatus: "Refunded",
//         name: "Grace Williams",
//         price: 349.99,
//         userId: 90123,
//     },
//     {
//         invoice: "INV-018",
//         paymentStatus: "Paid",
//         name: "Henry Baker",
//         price: 279.99,
//         userId: 65432,
//     },
//     {
//         invoice: "INV-019",
//         paymentStatus: "Pending",
//         name: "Isabella Clark",
//         price: 159.99,
//         userId: 12345,
//     },
//     {
//         invoice: "INV-020",
//         paymentStatus: "Overdue",
//         name: "Jack Carter",
//         price: 219.99,
//         userId: 78901,
//     }
// ];

const MyBookings = () => {
    const { data: bookings } = useGetAllBookingsUserQuery(undefined);
    console.log(bookings)

    const handleCancel = () => {
        const isProceed = window.confirm("Cancel Order");
        if (isProceed) {
            toast.success("Order cancelled successfully")
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
                                    <Button onClick={() => handleCancel()}>Cancel</Button>
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