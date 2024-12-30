/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllBookingsAdminQuery } from "@/redux/features/bookings/bookingsApi";

// import { useNavigate } from "react-router-dom"
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useMemo, useState } from "react";

const CancelledBookings = () => {
    const { data: bookings } = useGetAllBookingsAdminQuery(undefined);
    const user = useAppSelector((state) => state.auth.user);
    const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    // pagination
    const totalPages = Math.ceil(filteredBookings?.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredBookings?.slice(startIndex, endIndex);
    }, [filteredBookings, currentPage]);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const filteredAll = bookings?.data?.filter((booking: any) => booking?.isBooked === "canceled");
        setFilteredBookings(filteredAll);
    }, [bookings, user]);


    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl font-bold">
                Cancelled Bookings
            </h1>
            <section className="mt-6">
                <Table className="bg-white rounded-t-2xl drop-shadow-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No.</TableHead>
                            <TableHead>booking ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems?.map((booking: any, index: any) => (
                            <TableRow key={booking?._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{booking?._id}</TableCell>
                                <TableCell>{booking?.user?.name || "N/A"}</TableCell>
                                <TableCell>{booking?.user?.email || "N/A"}</TableCell>
                                <TableCell>
                                    ${booking?.payableAmount || "USD"} {booking?.cartId?.total?.toFixed(2) || "0.00"}
                                </TableCell>

                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full  bg-red-500 text-white`}
                                    >
                                        {booking?.isBooked}
                                    </span>
                                </TableCell>
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

export default CancelledBookings;