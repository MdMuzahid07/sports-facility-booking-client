/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllBookingsAdminQuery } from "@/redux/features/bookings/bookingsApi";
import { useMemo, useState } from "react";

const ManageBookings = () => {
    const { data: bookings } = useGetAllBookingsAdminQuery(undefined);
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    // const handleCancel = () => {
    //     const isProceed = window.confirm("Cancel Order");
    //     if (isProceed) {
    //         toast.success("Order cancelled successfully")
    //     }
    // }




    // pagination
    const totalPages = Math.ceil(bookings?.data?.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return bookings?.data?.slice(startIndex, endIndex);
    }, [bookings, currentPage]);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl font-bold">
                Manage Bookings
            </h1>
            <section className="mt-6">
                <Table className="bg-white rounded-t-2xl drop-shadow-sm">
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
                        {currentItems?.map((booking: any, index: any) => (
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

                <section className="bg-white flex items-center gap-4 justify-end rounded-b-2xl p-3 border-t pr-10">

                    {/* Array.form  This creates an array of a specific length (totalPages in this case) */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            className={`rounded-lg w-9 h-9 flex items-center justify-center ${currentPage === index + 1 ? "bg-black text-white" : "bg-slate-300 text-black border"}`}
                            key={index}
                            onClick={() => handleChangePage(index + 1)}
                            //  disables the button for the currently active page, so user can't re select the page they are already on.
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                </section>
            </section>
        </div>
    )
};

export default ManageBookings;