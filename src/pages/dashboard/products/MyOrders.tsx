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
import { Settings, Trash } from "lucide-react"
import { toast } from "sonner";
// import { useNavigate } from "react-router-dom"
import { useCancelOrderByUserMutation, useGetAllOrderQuery } from "@/redux/features/order/orderApi"

const MyOrders = () => {
    const { data: myOrders } = useGetAllOrderQuery(undefined);
    const [cancelOrderByUser, { error }] = useCancelOrderByUserMutation();

    console.error(error)

    const handleCancelOrder = async (id: string) => {
        const proceed = window.confirm("Cancel Order?");
        if (proceed) {
            try {
                toast.loading("Cancel Processing...", { id: "deleteId" });
                const res = await cancelOrderByUser({ id }).unwrap();
                if (res?.success) {
                    toast.success("Order canceled successfully", { id: "deleteId" });
                }
            } catch (error) {
                toast.error(`Something went wrong!`, { id: "deleteId" });
            }
        }
    };

    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl font-bold">
                My Orders
            </h1>
            <section className="mt-6">
                <Table className="bg-white rounded-2xl drop-shadow-sm">
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
                        {myOrders?.data?.map((order: any, index: any) => (
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
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="flex items-center rounded-full gap-2">
                                                <Settings size={15} />
                                                Options
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {/* {
                                                (order?.paymentMethod === "Pending") && <DropdownMenuItem
                                                    // onClick={() => handleUpdateOrder(order?._id)}
                                                    className="font-bold"
                                                >
                                                    <CircleDollarSign className="mr-2 h-4 w-4" />
                                                    Make Payment
                                                </DropdownMenuItem>
                                            } */}
                                            <DropdownMenuItem
                                                onClick={() => handleCancelOrder(order?._id)}
                                                className="font-bold text-red-600"
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Cancel Order
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

export default MyOrders;