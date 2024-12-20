/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { addCart } from "@/redux/features/cart/CartSlice";
import { useAppDispatch } from "@/redux/hooks";


import { useNavigate } from "react-router-dom";


const ProductCard = ({ product }: any) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleDetails = (id: string) => {
        navigate(`/product-details/${id}`);
    };

    const handleAddCart = (product: any) => {
        dispatch(addCart(product));
    };

    return (
        <Card className="w-full border-2 transition-all duration-200 delay-100 hover:shadow-xl bg-slate-100 hover:shadow-[#2E2E2E] hover:-translate-y-2 hover:scale-105 rounded-none border-slate-100 hover:border-[#2E2E2E]">
            <CardHeader title="click to view details" onClick={() => handleDetails(product?._id)} className="p-0 cursor-pointer">
                <img
                    src={product?.imageUrl}
                    alt="Product Image"
                    className="w-full h-65 md:h-48 object-cover"
                />
            </CardHeader>
            <CardContent title="click to view details" onClick={() => handleDetails(product?._id)} className="p-4">
                <CardTitle className="text-lg font-semibold cursor-pointer">{product?.title}</CardTitle>
                <div className="text-gray-700 mt-2 text-sm">
                    <p className="font-semibold">Price: $29.99</p>
                </div>
                {/* <div className="flex items-center mt-2"> */}
                {/* <p className="text-yellow-500 flex items-center gap-1"> */}
                {/* {[...Array(4)].map((_, i) => ( */}
                {/* // <StarIcon key={i} className="w-4 h-4 fill-current" /> */}
                {/* ))} */}
                {/* <StarIcon className="w-4 h-4 fill-current text-gray-300" /> 4 out of 5 stars */}
                {/* </p> */}
                {/* <span className="ml-2 text-gray-500">(120 reviews)</span> */}
                {/* </div> */}
            </CardContent>
            <CardFooter className="p-4 flex justify-between">
                <Button title="click for add to cart" onClick={() => handleAddCart(product)} variant="outline" className="w-full rounded-none text-xl hover:bg-[#2E2E2E] hover:text-white">Add to Cart</Button>
            </CardFooter>
        </Card>
    );
}

export default ProductCard