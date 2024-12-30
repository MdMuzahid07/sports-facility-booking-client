/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// import { useNavigate } from "react-router-dom"
import { useGetAllOrderQuery } from "@/redux/features/order/orderApi"
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useMemo, useState } from "react";

const CancelledOrders = () => {
    const { data: orders } = useGetAllOrderQuery(undefined);
    const user = useAppSelector((state) => state.auth.user);
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]);



    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    // pagination
    const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredOrders?.slice(startIndex, endIndex);
    }, [filteredOrders, currentPage]);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        const filteredAll = orders?.data?.filter((order: any) => order?.orderStatus === "Cancelled");
        const filteredForUser = filteredAll?.filter((order: any) => order?.customerDetails?.userId?._id === user?.id);

        if (user && user?.role === "admin") {
            setFilteredOrders(filteredAll);
        } else {
            setFilteredOrders(filteredForUser);
        }
    }, [orders, user]);

    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl font-bold">
                Cancelled Orders
            </h1>
            <section className="mt-6">
                <Table className="bg-white rounded-t-2xl drop-shadow-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No.</TableHead>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Shipping Address</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems?.map((order: any, index: any) => (
                            <TableRow key={order?._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{order?._id}</TableCell>
                                <TableCell>{order?.customerDetails?.userId?.name || "N/A"}</TableCell>
                                <TableCell>{order?.customerDetails?.userId?.email || "N/A"}</TableCell>
                                <TableCell>{new Date(order?.createdAt)?.toLocaleDateString() || "N/A"}</TableCell>
                                <TableCell>
                                    {order?.cartId?.currency || "USD"} {order?.cartId?.total?.toFixed(2) || "0.00"}
                                </TableCell>
                                <TableCell>
                                    {order?.paymentMethod} -{" "}
                                    <span
                                        className={`px-2 py-1 rounded-full ${order?.paymentStatus === "Completed"
                                            ? "bg-green-100 text-green-700"
                                            : order?.paymentStatus === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {order?.paymentStatus}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {`${order?.customerDetails?.address?.street}, ${order?.customerDetails?.address?.city}`}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full ${order?.orderStatus === "Completed"
                                            ? "bg-green-100 text-green-700"
                                            : order?.orderStatus === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {order?.orderStatus}
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

export default CancelledOrders;