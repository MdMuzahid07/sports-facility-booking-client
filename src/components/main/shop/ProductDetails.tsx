/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { useGetAllProductsQuery, useGetASingleProductQuery } from '@/redux/features/products/productApi';
import { useLayoutEffect, useState } from 'react';
import 'react-medium-image-zoom/dist/styles.css'
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { addCart } from '@/redux/features/cart/CartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Helmet } from 'react-helmet-async';
import ImageSlider from '../ImageSlider';
import ReviewCard from '../review/ReviewCard';
import { useAddReviewMutation, useGetAllReviewQuery } from '@/redux/features/review/review.api';
import { Label } from '@/components/ui/label';
import MultipleImageSelector from '@/utils/MultipleImageSelector';
import { toast } from 'sonner';



const ProductDetails = () => {
    const { productId } = useParams();
    const user = useAppSelector((state) => state.auth.user);
    const { data: product } = useGetASingleProductQuery(productId);
    const { data: allProducts } = useGetAllProductsQuery(undefined);
    const [addReview, { data, error, isLoading }] = useAddReviewMutation();
    const { data: reviews, isLoading: isReviewLoading } = useGetAllReviewQuery(productId);
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState("details");
    const [selectedImages, setSelectedImages] = useState<File[]>([]); // Store selected images
    const [rating, setRating] = useState(3);
    const [reviewText, setReviewText] = useState("");

    // Append selected images without overwriting
    const handleImageSelection = (files: File[]) => {
        setSelectedImages((prevFiles) => [...prevFiles, ...files]);
    };

    const handleTabSwitch = (tab: any) => {
        setActiveTab(tab);
    };

    const handleAddCart = (product: any) => {
        dispatch(addCart(product));
    };




    const handleReviewSubmit = async (e: any) => {
        e.preventDefault();

        const reviewData = {
            userId: user?.id,
            facilityOrProductId: productId,
            rating: rating.toString(),
            reviewText: reviewText,
        };

        const submitData = new FormData();
        /* This code block is checking if there are any selected images stored in the `selectedImages`
        state array. If there are selected images (i.e., `selectedImages` is truthy and its length is
        greater than 0), it iterates over each image in the array using `forEach` and appends each
        image to a `FormData` object named `submitData` using the `append` method. */
        if (selectedImages && selectedImages.length > 0) {
            selectedImages.forEach((image) => {
                submitData.append("files", image);
            });
        }
        submitData.append("data", JSON.stringify(reviewData));

        try {
            await addReview(submitData).unwrap();

            if (data && data?.success) {
                setSelectedImages([]);
                setRating(0);
                setReviewText("")
            }
        } catch (error) {
            console.log(error, "error from try catch");
        }
    };


    if (isLoading) {
        toast.loading("Creating...", { id: "addReviewToastId" });
    }

    if (error) {
        toast.error((error as any)?.data?.message, { id: "addReviewToastId" });
    }

    if (data && data?.success) {
        toast.success("Done", { id: "addReviewToastId" });
    }


    // this filtering for to separate reviews for this product 
    const filteredReviews = reviews?.data?.filter(({ facilityOrProductId }: { facilityOrProductId: string }) => facilityOrProductId === productId);




    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [productId]);


    return (
        <>
            <Helmet>
                <title>PlayTime Pro | Product Details</title>
                <meta
                    name="description"
                    content="sports equipments, product details page"
                />
            </Helmet>

            <div className="bg-slate-200 min-h-screen">
                <div className="max-w-7xl mx-auto py-12 lg:py-20 px-4 xl:px-0">
                    <h1 className="mb-10 text-3xl md:text-4xl font-bold ">Product Details</h1>
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                            <div className="col-span-3 flex justify-center items-center">
                                <div className="w-full">
                                    {/* <Zoom>
                                        <img
                                            title="click to zoom"
                                            src={product?.data?.imageUrl}
                                            alt=""
                                            className="w-full h-auto  hover:cursor-pointer max-h-[500px] object-cover shadow-lg"
                                        />
                                    </Zoom> */}
                                    <ImageSlider images={product?.data?.imageUrl} />
                                </div>
                            </div>
                            <div className="col-span-2 flex flex-col justify-between max-h-[400px]">
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
                                        onClick={() => handleAddCart(product?.data)}
                                        className="text-2xl rounded-none py-1"
                                        disabled={product?.data?.stock === 0}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>


                        {/* facility review,and details section start here  */}

                        <div className="my-10">
                            <div className="tabs flex space-x-4 mb-4">
                                <Button
                                    className={`tab ${activeTab === "details" ? "active" : "bg-white text-black"} font-bold rounded-none`}
                                    onClick={() => handleTabSwitch("details")}
                                >
                                    Product Details
                                </Button>
                                <Button
                                    className={`tab ${activeTab === "reviews" ? "active" : "bg-white text-black"} font-bold rounded-none`}
                                    onClick={() => handleTabSwitch("reviews")}
                                >
                                    Reviews
                                </Button>
                            </div>

                            {activeTab === "details" && (
                                <div className="product-details">
                                    {product?.data?.description ? (
                                        <article className="prose lg:prose-xl">
                                            <div
                                                className="w-full"
                                                dangerouslySetInnerHTML={{ __html: product?.data?.description }}
                                            />
                                        </article>
                                    ) : (
                                        <p>No content available for this blog.</p>
                                    )}
                                </div>
                            )}

                            {activeTab === "reviews" && (
                                <div className="reviews">
                                    <div className="grid lg:grid-cols-2 gap-8">
                                        <div className="mt-7">
                                            {
                                                isReviewLoading ? (<p>Review Loading...</p>) : (
                                                    filteredReviews?.map((review: any) => (
                                                        <ReviewCard key={review?._id} review={review} />
                                                    )))
                                            }
                                        </div>
                                        <div>
                                            <h3 className="mb-10 text-3xl md:text-4xl font-bold">Write a Review</h3>
                                            <form onSubmit={handleReviewSubmit}>
                                                <div className="mb-4">
                                                    <label className="block text-md font-medium">Rating</label>
                                                    <div className="flex space-x-2">
                                                        {[1, 2, 3, 4, 5]?.map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                className={`star text-3xl ${rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                                                                onClick={() => setRating(star)}
                                                            >
                                                                ★
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <Label className="mb-2" htmlFor="picture">Select Product Images</Label>
                                                    <MultipleImageSelector
                                                        onImagesSelected={handleImageSelection}
                                                        multiple={true}
                                                        maxFiles={3}
                                                        accept="image/png, image/jpeg"
                                                        style="rounded-none"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium">Review Text</label>
                                                    <textarea
                                                        className="w-full p-2 border focus:outline-none"
                                                        rows={4}
                                                        value={reviewText}
                                                        onChange={(e) => setReviewText(e.target.value)}
                                                        placeholder="Write your review here..."
                                                    ></textarea>
                                                </div>

                                                <Button disabled={!user && !(user as any)?.id} type="submit" className="btn rounded-none text-white py-2 px-4 ">
                                                    Submit Review
                                                </Button>
                                                {
                                                    !user && !(user as any)?.id ? (<p>Please login to review</p>) : ""
                                                }
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* facility review,and details section end here  */}



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
        </>

    );
}

export default ProductDetails;