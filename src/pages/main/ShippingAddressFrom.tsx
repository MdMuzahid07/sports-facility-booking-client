/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useAddOrderMutation } from "@/redux/features/order/orderApi";
import PageTopByDefault from "@/utils/PageTopByDefault";
import { clearCart } from "@/redux/features/cart/CartSlice";
import { useAppSelector } from "@/redux/hooks";

const ShippingAddressFrom = () => {
    const [addOrder, { error, isLoading }] = useAddOrderMutation();
    const { cartId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const currentUserId = user?.id;

    console.log(error, "🐞🐞🐞🐞🐞");

    const handleOrderSubmit = async (e: any) => {
        e.preventDefault();

        const orderData = {
            cartId: cartId,
            customerDetails: {
                userId: currentUserId,
                //* can access all info using the userId
                // name: e.target.name.value,
                // email: e.target.email.value,
                // phoneNumber: e.target.phoneNumber.value,
                address: {
                    street: e.target.street.value,
                    city: e.target.city.value,
                    state: e.target.state.value,
                    postalCode: e.target.postalCode.value,
                    country: e.target.country.value
                }
            },
            //* by default "Pending" from the backend, no need to send it from here
            // paymentMethod: "Pending",
            // paymentStatus: "Pending",
            // orderStatus: "Pending"
        }



        try {
            if (isLoading) {
                toast.loading("Processing your order...", { id: "SportsEquipmentsOrderToastId" });
            } else {
                const data = await addOrder(orderData).unwrap();
                if (data?.success) {
                    toast.success("Please make payment to confirm order!", { id: "SportsEquipmentsOrderToastId" });

                    const getOrderIdAfterSavedIdDB = data?.data?._id;
                    console.log({ data, getOrderIdAfterSavedIdDB })
                    dispatch(clearCart());
                    navigate(`/payment/${getOrderIdAfterSavedIdDB}`);
                }
            }
        } catch (error) {
            console.log(error, "from catch error")
            toast.error(
                (error as any)?.data?.checkErrorPattern?.code === 11000
                    ? "Already ordered with this Cart"
                    : "Order failed!",
                { id: "SportsEquipmentsOrderToastId" }
            );
        }
    };


    PageTopByDefault();

    return (
        <div className="min-h-screen bg-slate-100 pb-32 relative">
            <img className="w-full h-[500px] object-cover z-0" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725805321/Untitled_design_xi0qdl.png" alt="" />
            <div className="max-w-7xl rounded-2xl drop-shadow-sm  mx-auto bg-slate-200 min-h-[400px] bg-opacity-75 shadow p-8 -mt-44 relative">

                <div className="mb-14">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 ">Complete Your Purchase</h1>
                    <p className="text-md md:text-2xl opacity-75">Add your shipping address, and proceed to payment</p>
                </div>
                <form onSubmit={handleOrderSubmit}>
                    {/* Customer Information */}
                    {/* <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-bold">Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                placeholder="name"
                                className="w-full mt-1 px-4 rounded-full drop-shadow-sm bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="email"
                                className="w-full mt-1 px-4 rounded-full drop-shadow-sm bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">Phone Number</label>
                            <input
                                required
                                type="text"
                                name="phoneNumber"
                                placeholder="phone number"
                                className="w-full mt-1 px-4 rounded-full drop-shadow-sm bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                    </div> */}

                    {/* Address Information */}
                    <h2 className="text-xl font-semibold mt-8 mb-4">Shipping Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-bold">Street</label>
                            <input
                                required
                                type="text"
                                name="street"
                                placeholder="street"
                                className="w-full mt-1 px-4 rounded-full drop-shadow-sm bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">City</label>
                            <input
                                required
                                type="text"
                                name="city"
                                placeholder="city"
                                className="w-full mt-1 px-4 rounded-full drop-shadow-sm bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">State</label>
                            <input
                                required
                                type="text"
                                name="state"
                                placeholder="state"
                                className="w-full mt-1 px-4 rounded-full drop-shadow-sm bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">Postal Code</label>
                            <input
                                required
                                type="text"
                                name="postalCode"
                                placeholder="postalCode"
                                className="w-full mt-1 px-4 rounded-full drop-shadow-sm bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">Country</label>
                            <input
                                required
                                type="text"
                                name="country"
                                placeholder="country"
                                className="w-full mt-1 px-4 rounded-full drop-shadow-sm bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                    </div>


                    <div className="mt-24 mb-10 flex justify-end">
                        <Button
                            type="submit"
                            className="rounded-full text-lg font-bold py-1">
                            Proceed to Payment
                            <MoveRight className="ml-3" />
                        </Button>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default ShippingAddressFrom;