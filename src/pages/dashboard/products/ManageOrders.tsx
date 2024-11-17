/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PackageCheck, PackageSearch, Settings, Trash, X } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useDeleteAOrderMutation, useGetAllOrderQuery } from "@/redux/features/order/orderApi"

type TError = {
    message?: string;
}

const ManageOrders = () => {
    const { data: allOrders } = useGetAllOrderQuery(undefined);
    const [deleteAOrder, { error }] = useDeleteAOrderMutation();

    const navigate = useNavigate();

    const handleDeleteOrder = async (id: string) => {
        const proceed = window.confirm("Cancel Order?");
        if (proceed) {
            try {
                toast.loading("Loading...", { id: "deleteId" });
                const res = await deleteAOrder(id).unwrap();
                if (res?.success) {
                    toast.success("Order canceled successfully", { id: "deleteId" });
                }
                else {
                    if (error) {
                        if ("data" in error && (error as FetchBaseQueryError).data) {
                            toast.error(`${((error as FetchBaseQueryError).data as TError)?.message || "Something went wrong!"}`, { id: "deleteId" });
                        } else {
                            toast.error(`Something went wrong!`, { id: "deleteId" });
                        }
                    };
                }
            } catch (error) {
                toast.error(`Something went wrong!`, { id: "deleteId" });
            }
        }
    };



    const handleUpdateFacility = (id: string) => {
        navigate(`/dashboard/update-facility/${id}`);
    };


    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                Manage Orders
            </h1>
            <section className="mt-14">
                <Table className="bg-white rounded-lg shadow">
                    <TableCaption className="text-lg font-bold">User Orders</TableCaption>
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
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allOrders?.data?.map((order: any, index: any) => (
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
                                        className={`px-2 py-1 rounded ${order?.paymentStatus === "Completed"
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
                                        className={`px-2 py-1 rounded ${order?.orderStatus === "Completed"
                                            ? "bg-green-100 text-green-700"
                                            : order?.orderStatus === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {order?.orderStatus}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="px-2 mt-2 w-full flex items-center gap-2">
                                                <Settings size={15} />
                                                Order Status
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 mt-3 shadow-xl">
                                            <DropdownMenuLabel className="font-bold">Change Order Status</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => handleDeleteOrder(order?._id)}
                                                className="font-bold"
                                            >
                                                <PackageSearch className="mr-2 h-4 w-4" />
                                                Change to Processing
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleDeleteOrder(order?._id)}
                                                className="font-bold"
                                            >
                                                <PackageCheck className="mr-2 h-4 w-4" />
                                                Change to Delivered
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleDeleteOrder(order?._id)}
                                                className="font-bold"
                                            >
                                                <X className="mr-2 h-4 w-4" />
                                                Cancelled the Order
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </div>
    )
};

export default ManageOrders;