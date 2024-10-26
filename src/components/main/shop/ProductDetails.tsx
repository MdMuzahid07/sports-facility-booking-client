import { Button } from '@/components/ui/button';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'



const ProductDetails = () => {


    return (
        <div className="bg-slate-200 min-h-screen">
            <div className="h-[40vh] w-full hidden lg:block">
                <img className="h-full w-full object-cover object-bottom" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725689329/1752_x3nrjw.jpg" alt="" />
            </div>
            <div className="max-w-7xl mx-auto py-12 lg:py-32 px-4 xl:px-0">
                <h1 className="mb-10 text-3xl md:text-4xl font-bold ">Product Details</h1>
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                        <div className="col-span-3 flex justify-center items-center">
                            <div className="w-full">
                                <Zoom>
                                    <img
                                        src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725689329/1752_x3nrjw.jpg"
                                        alt=""
                                        className="w-full h-auto max-h-[500px] object-cover shadow-lg"
                                    />
                                </Zoom>
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl font-bold  mb-2">title</h1>
                                <p className=" text-lg">Category: name</p>
                                <p className=" text-lg">Minimum Buy: Quantity</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-4xl font-semibold  mb-2">$price</p>
                                <p className="text-yellow-500 text-lg">Rating: 4.5</p>
                            </div>
                            <div className="mb-4">
                                {/* {product?.data?.stock > 0 ? (
                                    <p className=" text-lg">In Stock stock available)</p>
                                ) : (
                                    <p className="text-red-500 text-lg">Out of Stock</p>
                                )} */}
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
                        <p className="">description</p>
                    </div>


                </div>

                {/* Related Products Section */}
                <div className="mt-44">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-10 ">Related category</h1>
                    <div className="w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5">
                        {/* {filterProductCategoryWise?.slice(0, 5)?.map((product: any) => (
                            <ProductCard key={product?._id} product={product} />
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails