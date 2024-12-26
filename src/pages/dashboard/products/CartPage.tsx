/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom"
import { useLayoutEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAddCartMutation } from "@/redux/features/cart/CartApi";
import { clearCart } from "@/redux/features/cart/CartSlice";
import CartPageCard from "@/cart/CartPageCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Puzzle } from "lucide-react";

interface TCartInfo {
    productId: string;
    quantity: number;
    totalPrice: number;
};


const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartProducts = useAppSelector((state) => state.cart.products);
    const [addCart, { isLoading }] = useAddCartMutation();

    // cart calculation
    const totalProducts = cartProducts?.length | 0;
    let cost = 0;
    cartProducts?.forEach((product) => {
        cost = Number((cost + Number(product?.price) * Number(product?.purchaseQuantity)).toFixed(2));
    });
    const discountAmount = Number((cost * 0.05).toFixed(2));
    const newCost = Number(cost - discountAmount);
    const tax = Number(discountAmount * 0.5);
    const shippingCost = Number(cartProducts?.length * 5);
    const grandTotal = Number((newCost + tax + shippingCost).toFixed(2));
    const cartProductsInfoToSubmit: TCartInfo[] = [];

    cartProducts?.forEach(element => {
        cartProductsInfoToSubmit.push({
            productId: element?._id,
            quantity: Number(element?.purchaseQuantity),
            totalPrice: Number((element?.purchaseQuantity as number * element?.price).toFixed(2)),
        })
    });

    const handleClearCart = () => {
        const proceed = window.confirm("clear cart products?");
        if (proceed) {
            dispatch(clearCart());
        }
    };


    const handleCart = async () => {
        const cartData =
        {
            userId: "user_001",
            items: [
                ...cartProductsInfoToSubmit
            ],
            subtotal: Number(cost),
            tax: Number(tax),
            shippingCost: Number(shippingCost),
            total: Number(grandTotal),
            currency: "USD"
        }

        if (isLoading) {
            toast.loading("Loading...", { id: "newCart" });
        };

        const data = await addCart(cartData).unwrap();

        if (data?.success && data?.data?._id) {
            console.log("working ?")
            navigate(`/shipping-address/${data?.data?._id}`)
        }
    };



    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="bg-slate-200 w-full h-full">
            <div className="h-56 w-full">
                <img className="h-full w-full object-cover" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725689329/1752_x3nrjw.jpg" alt="" />
            </div>
            <div className="max-w-7xl mx-auto pt-16 pb-32 px-4 lg:px-0">
                <div className="grid lg:grid-cols-8 gap-7 mt-14">
                    <div className="lg:col-span-5">
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold ">My Cart</h1>
                        <div className=" border-t border-primary mt-7">
                            <div className="overflow-y-scroll md:h-[600px] mt-7 bg-white px-4">
                                {
                                    cartProducts.length > 0 ? cartProducts?.map((product: any) => <CartPageCard key={product?._id} product={product} />) : <div className="flex items-center justify-center h-full">
                                        <p className=" text-2xl">Add items to your cart to continue your purchase.</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <h1 className="text-xl sm:text-2xl md:text-4xl">Order Summery</h1>
                        <div className="border-t border-primary mt-7">
                            <div className="bg-white px-5 py-10 mt-7">
                                <ul>
                                    <li className="mb-3 text-md py-1 hover:bg-primary hover:text-white px-2 flex justify-between items-center">
                                        <span className="font-bold ">Total Products :</span>
                                        <span>{totalProducts}</span>
                                    </li>
                                    <li className="mb-3 text-md py-1 hover:bg-primary hover:text-white px-2  flex justify-between items-center">
                                        <span className="font-bold ">Cost  :</span> <span>${cost}</span>
                                    </li>
                                    <li className="mb-3 text-md py-1 hover:bg-primary hover:text-white px-2  flex justify-between items-center">
                                        <span className="font-bold ">Discount  :</span> <span>${discountAmount}</span>
                                    </li>
                                    <li className="mb-3 text-md py-1 hover:bg-primary hover:text-white px-2  flex justify-between items-center">
                                        <span className="font-bold ">Tax  :</span> <span>${tax}</span>
                                    </li>
                                    <li className="mb-3 text-md py-1 hover:bg-primary hover:text-white px-2  flex justify-between items-center">
                                        <span className="font-bold ">Shipping Cost  :</span> <span>${shippingCost}</span>
                                    </li>
                                    <li className="relative mb-3 py-1 px-2">
                                        <span className="font-bold ">Coupon Code(if have):</span> <div className="flex w-full items-center mt-3">
                                            <Puzzle className="w-4 h-4 absolute left-6" />
                                            <Input className=" w-full rounded-none focus:outline-none focus:border-none active:outline-none active:border-none pl-10" type="email" placeholder="Enter Coupon Code" />
                                            <Button className="rounded-none" type="submit">Apply Coupon</Button>
                                        </div>
                                    </li>
                                </ul>


                                <hr className="border-t border-primary mt-5 mb-1" />
                                <p className="text-lg  flex justify-between items-center  py-1 px-2"><span className="font-bold ">Grad Total  :</span> <span className="font-bold">${grandTotal}</span></p>

                                <div className="mt-7 flex items-center gap-4 px-2">
                                    <button onClick={handleClearCart} className="px-4 py-1 border  bg-white  hover:text-white hover:bg-red-500">Clear All</button>
                                    <button
                                        disabled={cartProducts?.length <= 0}
                                        onClick={() => handleCart()} className={`${(cartProducts?.length <= 0) ? "opacity-75" : ""} px-4 py-1 border  bg-primary text-white font-bold w-32`}
                                    >Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CartPage;