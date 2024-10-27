/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeAProduct, updateQuantity } from "@/redux/features/cart/CartSlice";
import { useAppDispatch } from "../redux/hooks";

const CartPageCard = ({ product }: any) => {
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
        <div className="border-t py-7 bg-white overflow-hidden w-full grid grid-cols-9 gap-2">
            <div className="col-span-3 w-full h-full">
                <img src={product?.imageUrl} alt="" />
            </div>
            <div className="col-span-6 relative pl-0 p-4">

                <h1 className="text-md font-semibold">Name: {product?.title}</h1>
                <p className="text-xs text-slate-500">Category: {product?.category?.name}</p>

                <div className="absolute left-0 bottom-2 flex items-center justify-between w-full">

                    <div className="flex items-center gap-3">
                        <p className="text-md">${price}</p>
                        <div className="border px-2 h-5 flex items-center gap-1 ">
                            <button onClickCapture={() => handleQuantity("decrement", product?._id)} className="text-md w-4 h-4 flex justify-center items-center" >-</button>
                            <p className="text-xs">{product?.purchaseQuantity}</p>
                            <button onClickCapture={() => handleQuantity("increment", product?._id)} className="text-md w-4 h-4 flex justify-center items-center" >+</button>
                        </div>
                    </div>

                    <button onClick={() => handleRemove(product?._id)} className="pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width={14} height={14} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M4 7l16 0"></path>
                            <path d="M10 11l0 6"></path>
                            <path d="M14 11l0 6"></path>
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    )
};

export default CartPageCard;
