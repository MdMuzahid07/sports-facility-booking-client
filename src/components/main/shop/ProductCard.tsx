/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { addCart } from "@/redux/features/cart/CartSlice";
import { useGetAllReviewQuery } from "@/redux/features/review/review.api";
import { useAppDispatch } from "@/redux/hooks";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";


import { useNavigate } from "react-router-dom";


const ProductCard = ({ product }: any) => {
    const productId = product?._id;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const ref = useRef(null);
    const isInView = useInView(ref);

    const { data: reviews } = useGetAllReviewQuery(productId);
    const filteredReviews = reviews?.data?.filter(({ facilityOrProductId }: { facilityOrProductId: string }) => facilityOrProductId === productId);
    // const ratingNumber = Number(filteredReviews?.rating);
    // const ratings = Array.from({ length: ratingNumber }, (_, index) => index + 1);

    const handleDetails = (id: string) => {
        navigate(`/product-details/${id}`);
    };

    const handleAddCart = (product: any) => {
        dispatch(addCart(product));
    };

    return (
        <div ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Card className="w-full border-2 transition-all duration-200 delay-100 hover:shadow-xl bg-slate-100 hover:shadow-[#2E2E2E] hover:-translate-y-2 hover:scale-105 rounded-none border-slate-100 hover:border-[#2E2E2E]">
                    <CardHeader title="click to view details" onClick={() => handleDetails(product?._id)} className="p-0 cursor-pointer">
                        <img
                            src={product?.imageUrl[0]}
                            alt="Product Image"
                            className="w-full h-65 md:h-48 object-cover"
                        />
                    </CardHeader>
                    <CardContent title="click to view details" onClick={() => handleDetails(product?._id)} className="p-4">
                        <CardTitle className="text-lg font-semibold cursor-pointer">{product?.title}</CardTitle>
                        <div className="text-gray-700 mt-2 text-sm flex items-center justify-between">
                            <p className="font-semibold text-xs">Reviews ({filteredReviews?.length})</p>
                            <p className="font-semibold">Price: ${product?.price}</p>
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
                        <Button title="click for add to cart" onClick={() => handleAddCart(product)} variant="outline" className="w-full rounded-full text-xl hover:bg-[#2E2E2E] hover:text-white">Add to Cart</Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}

export default ProductCard