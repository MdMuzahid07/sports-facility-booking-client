/* eslint-disable @typescript-eslint/no-explicit-any */

import { removeAProduct, updateQuantity } from "@/redux/features/cart/CartSlice";
import { useAppDispatch } from "../redux/hooks";

const CartCard = ({ product }: any) => {
    const dispatch = useAppDispatch();

    const handleQuantity = (type: string, id: string) => {
        const payload = {
            type: type,
            id: id
        };
        dispatch(updateQuantity(payload));
    };

    const handleRemove = (id: string) => {
        dispatch(removeAProduct(id));
    };

    const price = (Number(product?.purchaseQuantity) * Number(product?.price)).toFixed(2);

    return (
        <div className="flex gap-2 py-5 border-b border-primary relative">
            <img className="w-20 border drop-shadow-sm h-20 object-cover " src={product?.imageUrl?.[0]} alt="" />
            <div className="py-1">
                <h1 className="text-md">{product?.title}</h1>
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center gap-1 border px-2 w-16">
                        <button onClickCapture={() => handleQuantity("decrement", product?._id)} className="text-md w-4 h-4 flex justify-center items-center" >-</button>
                        <p className="text-xs">{product?.purchaseQuantity}</p>
                        <button onClickCapture={() => handleQuantity("increment", product?._id)} className="text-md w-4 h-4 flex justify-center items-center" >+</button>
                    </div>
                    <p className="text-xs">${price}</p>
                </div>
            </div>
            <button onClick={() => handleRemove(product?._id)} className="absolute top-4 right-0 w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}

export default CartCard