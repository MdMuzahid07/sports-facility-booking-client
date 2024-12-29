/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllBookingsUserQuery } from "@/redux/features/bookings/bookingsApi";

// import { useNavigate } from "react-router-dom"
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const CancelledBookingsUser = () => {
    const { data: userBookings } = useGetAllBookingsUserQuery(undefined);
    const user = useAppSelector((state) => state.auth.user);
    const [filteredBookings, setFilteredBookings] = useState<any[]>([]);

    useEffect(() => {

        const filteredAllCancelledForUser = userBookings?.data?.filter((booking: any) => booking?.isBooked === "canceled");

        const filteredForUser = filteredAllCancelledForUser?.filter((booking: any) => booking?.user?._id === user?.id);

        setFilteredBookings(filteredForUser);
    }, [userBookings, user]);

    console.log(filteredBookings)

    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl font-bold">
                Cancelled Bookings
            </h1>
            <section className="mt-6">
                <Table className="bg-white rounded-2xl drop-shadow-sm">
                    <TableCaption className="text-lg font-bold">User bookings</TableCaption>
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
                        {filteredBookings?.map((booking: any, index: any) => (
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
            </section>
        </div>
    )
};

export default CancelledBookingsUser;