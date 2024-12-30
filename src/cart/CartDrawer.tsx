/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom"
import CartCard from "./CartCard"
import { useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/CartSlice";
import Dropdown from "@/components/ui/Dropdown";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



const styles = {
    btn: "sm:w-9 w-7 sm:h-9 h-7 rounded-full flex justify-center items-center border active:border-green-900",
};


const CartDrawer = ({ cartDrop, setCartDrop }: any) => {
    const navigate = useNavigate();
    const cartProducts = useAppSelector((state) => (state as any)?.cart?.products)
    const dispatch = useDispatch();

    const handleCart = () => {
        navigate("/checkout-cart");
        setCartDrop(false);
    };

    const handleClearCart = () => {
        const proceed = window.confirm("clear cart products?");
        if (proceed) {
            dispatch(clearCart());
            toast.success("Cart clear", { id: "CartClear" });
            setCartDrop(false);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            if (cartProducts?.length > 0) {
                const message = "Want to Reload page? Cart data may be lost.";
                event.returnValue = message;
                return message;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [cartProducts]);



    return (
        <div>
            <button
                onClick={() => setCartDrop(!cartDrop)}
                className={`${styles.btn} relative`}>
                <ShoppingCart size={20} />
                <span className="absolute -bottom-2 -right-2 w-4 h-4 lg:w-5 lg:h-5 text-[8px] lg:text-xs bg-primary text-white border rounded-full flex items-center justify-center">{cartProducts?.length}</span>
            </button>

            <AnimatePresence>
                {cartDrop && (
                    <motion.div
                        initial={{ x: "100%" }} // Start off-screen (right side)
                        animate={{ x: 0 }} // Slide into view
                        exit={{ x: "100%" }} // Slide out to the right
                        transition={{ type: "spring", stiffness: 500, damping: 30 }} // Smooth motion
                        className="fixed w-full md:w-[450px] min-h-screen right-0 top-16 shadow-lg z-50"
                    >
                        <Dropdown active={cartDrop} styles="w-full min-h-screen">
                            <h1 className="text-lg border-b border-primary pb-1 flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5" />
                                My Cart
                            </h1>
                            <div className="overflow-y-auto custom-scrollbar h-[70vh] md:h-[75vh]">
                                {cartProducts?.length > 0 ? (
                                    cartProducts?.map((product: any) => (
                                        <CartCard product={product} key={product?._id} />
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-xl">Add items.</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-center gap-2 p-2">
                                <button
                                    onClick={() => handleCart()}
                                    className="border rounded-full w-full py-1.5 border-primary font-bold hover:bg-white hover:text-primary bg-primary text-white"
                                >
                                    View Cart
                                </button>

                                <button
                                    disabled={cartProducts?.length <= 0}
                                    onClick={handleClearCart}
                                    className={`${cartProducts?.length <= 0
                                        ? "opacity-75 hover:bg-primary"
                                        : ""
                                        } border w-full py-1.5 border-primary font-bold hover:bg-primary hover:text-white rounded-full`}
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </Dropdown>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >

    )
}

export default CartDrawer;