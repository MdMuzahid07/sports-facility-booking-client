/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { useGetAllProductsQuery, useGetASingleProductQuery } from '@/redux/features/products/productApi';
import { useLayoutEffect } from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';



const ProductDetails = () => {
    const { productId } = useParams();
    const { data: product } = useGetASingleProductQuery(productId);
    const { data: allProducts } = useGetAllProductsQuery(undefined);


    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [productId]);

    return (
        <div className="bg-slate-200 min-h-screen">
            <div className="h-[40vh] w-full hidden lg:block">
                <img className="h-full w-full object-cover object-bottom" src={product?.data?.imageUrl} alt="" />
            </div>
            <div className="max-w-7xl mx-auto py-12 lg:py-32 px-4 xl:px-0">
                <h1 className="mb-10 text-3xl md:text-4xl font-bold ">Product Details</h1>
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                        <div className="col-span-3 flex justify-center items-center">
                            <div className="w-full">
                                <Zoom>
                                    <img
                                        title="click to zoom"
                                        src={product?.data?.imageUrl}
                                        alt=""
                                        className="w-full h-auto  hover:cursor-pointer max-h-[500px] object-cover shadow-lg"
                                    />
                                </Zoom>
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl font-bold  mb-2">{product?.data?.title}</h1>
                                <p className=" text-lg">Category: Sports Equipment</p>
                                <p className=" text-lg">Minimum Buy: {product?.data?.quantity}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-4xl font-semibold  mb-2">${product?.data?.price}</p>
                                {/* <p className="text-yellow-500 text-lg">Rating: 4.5</p> */}
                            </div>
                            <div className="mb-4">
                                {product?.data?.stock > 0 ? (
                                    <p className=" text-lg">In Stock stock available({product?.data?.stock})</p>
                                ) : (
                                    <p className="text-red-500 text-lg">Out of Stock</p>
                                )}
                            </div>
                            <div>
                                <Button
                                    className="text-2xl rounded-none py-1"
                                // disabled={product?.data?.stock === 0}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-xl font-semibold  mb-2">Product Description</h2>
                        <p className="">{product?.data?.description}</p>
                    </div>


                </div>

                {/* Related Products Section */}
                <div className="mt-44">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-10 ">Other Products</h1>
                    <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {allProducts?.data?.filter((product: any) => product?._id !== productId).slice(0, 4)?.map((product: any) => (
                            <ProductCard key={product?._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;