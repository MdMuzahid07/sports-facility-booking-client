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

const styles = {
    btn: "sm:w-9 w-7 sm:h-9 h-7 rounded-full flex justify-center items-center border active:border-green-900",
};


const CartDropdown = ({ cartDrop, setCartDrop }: any) => {
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

            <Dropdown
                active={cartDrop}
                styles="absolute w-full md:w-[400px] h-[500px] md:h-[600px] right-0 top-20  text-left"
            >
                <h1 className="text-xl font-bold border-b border-primary pb-1 flex items-center gap-2">
                    <ShoppingCart size={30} />

                    My Cart
                </h1>
                <div className="overflow-y-auto h-[350px] md:h-[470px]">
                    {
                        (cartProducts.length > 0)
                            ?
                            cartProducts?.map((product: any) => <CartCard product={product} key={product?._id} />)
                            :
                            <div className="flex items-center justify-center h-full">
                                <p className="text-xl">Add items.</p>
                            </div>
                    }
                </div>
                <div className="flex justify-between items-center gap-2 bottom-0 pt-3">
                    <button onClick={() => handleCart()} className="border w-full py-1.5 border-primary font-bold hover:bg-white hover:text-primary bg-primary text-white">View Cart</button>
                    <button disabled={cartProducts?.length <= 0} onClick={handleClearCart} className={`${(cartProducts?.length <= 0) ? "opacity-75 hover:bg-primary" : ""} border w-full py-1.5 border-primary font-bold hover:bg-primary hover:text-white`}>Clear Cart</button>
                </div>
            </Dropdown>
        </div>

    )
}

export default CartDropdown