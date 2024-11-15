/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const ShippingAddressFrom = () => {
    // const [addOrder, { error, isLoading }] = useAddOrderMutation();
    const { cartId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log(error, "🐞🐞🐞🐞🐞");


    const handleOrderSubmit = async (e: any) => {
        e.preventDefault();

        const orderData = {
            cartId: cartId,
            customerDetails: {
                name: e.target.name.value,
                email: e.target.email.value,
                phoneNumber: e.target.phoneNumber.value,
                address: {
                    street: e.target.street.value,
                    city: e.target.city.value,
                    state: e.target.state.value,
                    postalCode: e.target.postalCode.value,
                    country: e.target.country.value
                }
            },
            paymentMethod: payMethod,
            paymentStatus: "",
            orderStatus: "Completed"
        }

        // if (error) {
        //     return toast.loading("Order failed", { id: "orderPending" });
        // }

        try {
            // if (isLoading) {
            //     toast.loading("Processing your order...", { id: "orderPending" });
            // } else {
            //     const data = await addOrder(orderData).unwrap();
            //     if (data?.success) {
            //         toast.success("Order successful!", { id: "orderPending" });

            //         dispatch(clearCart());

            //         navigate("/");
            //     }
            // }
        } catch {
            toast.error("Order failed. Please try again.", { id: "orderPending" });
        }
    };


    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 pb-32 relative">
            <img className="w-full h-[500px] object-cover z-0" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725805321/Untitled_design_xi0qdl.png" alt="" />
            <div className="max-w-7xl  mx-auto bg-slate-200 min-h-[400px] bg-opacity-75 shadow p-8 -mt-44 relative">

                <div className="mb-14">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 ">Complete Your Purchase</h1>
                    <p className="text-md md:text-2xl opacity-75">Add your shipping address, and proceed to payment</p>
                </div>
                <form onSubmit={handleOrderSubmit}>
                    {/* Customer Information */}
                    <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-bold">Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                placeholder="name"
                                className="w-full mt-1 px-4 bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="email"
                                className="w-full mt-1 px-4 bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">Phone Number</label>
                            <input
                                required
                                type="text"
                                name="phoneNumber"
                                placeholder="phone number"
                                className="w-full mt-1 px-4 bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                    </div>

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
                                className="w-full mt-1 px-4 bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">City</label>
                            <input
                                required
                                type="text"
                                name="city"
                                placeholder="city"
                                className="w-full mt-1 px-4 bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">State</label>
                            <input
                                required
                                type="text"
                                name="state"
                                placeholder="state"
                                className="w-full mt-1 px-4 bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">Postal Code</label>
                            <input
                                required
                                type="text"
                                name="postalCode"
                                placeholder="postalCode"
                                className="w-full mt-1 px-4 bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                        <div>
                            <label className="block font-bold">Country</label>
                            <input
                                required
                                type="text"
                                name="country"
                                placeholder="country"
                                className="w-full mt-1 px-4 bg-slate-100 focus:outline-slate-300 py-3 border"
                            />
                        </div>
                    </div>


                    <div className="mt-24 mb-10 flex justify-end">
                        <Button
                            type="submit"
                            className="rounded-none text-2xl font-bold py-1">
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