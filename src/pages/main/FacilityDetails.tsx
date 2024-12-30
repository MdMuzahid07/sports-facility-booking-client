/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router-dom';
// import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css'
import { DollarSign, MapPin, NotebookPen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetAllFacilitiesQuery, useGetASingleFacilityQuery } from '@/redux/features/facilities/facilityApi';
import PageTopByDefault from '@/utils/PageTopByDefault';
import FacilityCard from '@/components/main/FacilityCard';
import ScrollToTop from '@/components/ScrollToTop';
import { Helmet } from 'react-helmet-async';
import ImageSlider from '@/components/main/ImageSlider';
import { useState } from 'react';
import ReviewCard from '@/components/main/review/ReviewCard';
import { Label } from '@radix-ui/react-label';
import MultipleImageSelector from '@/utils/MultipleImageSelector';
import { useAppSelector } from '@/redux/hooks';
import { useAddReviewMutation, useGetAllReviewQuery } from '@/redux/features/review/review.api';
import { toast } from 'sonner';

const FacilityDetails = () => {
    const { facilityId } = useParams();
    const user = useAppSelector((state) => state.auth.user);
    const { data: allFacilities } = useGetAllFacilitiesQuery(undefined);
    const { data: singleFacility } = useGetASingleFacilityQuery(facilityId);
    const { data: reviews, isLoading: isReviewLoading } = useGetAllReviewQuery(facilityId);
    const [addReview, { data, error, isLoading }] = useAddReviewMutation();
    const [activeTab, setActiveTab] = useState("details");
    const [selectedImages, setSelectedImages] = useState<File[]>([]); // Store selected images
    const [rating, setRating] = useState(3);
    const [reviewText, setReviewText] = useState("");
    const navigate = useNavigate();


    // Append selected images without overwriting
    const handleImageSelection = (files: File[]) => {
        setSelectedImages((prevFiles) => [...prevFiles, ...files]);
    };



    const handleTabSwitch = (tab: any) => {
        setActiveTab(tab);
    };

    const handleBookingPageRedirect = (id: string) => {
        navigate(`/facility-booking/${id}`);
    };




    const handleReviewSubmit = async (e: any) => {
        e.preventDefault();

        const reviewData = {
            userId: user?.id,
            facilityOrProductId: facilityId,
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
    const filteredReviews = reviews?.data?.filter(({ facilityOrProductId }: { facilityOrProductId: string }) => facilityOrProductId === facilityId);



    PageTopByDefault();

    return (
        <>
            <Helmet>
                <title>PlayTime Pro | Facility Details</title>
                <meta
                    name="description"
                    content="PlayTime Pro, facility details page"
                />
            </Helmet>


            <section className="bg-slate-200 py-12 lg:py-20 px-4 xl:px-0">
                <div className="max-w-7xl mx-auto">
                    <h1 className="mb-10 text-3xl md:text-4xl font-bold ">Facility Details</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                        <div className="col-span-3 flex justify-center items-center">
                            <div className="w-full">
                                {/* <Zoom>
                                    <img
                                        src={singleFacility?.data?.image}
                                        alt="image"
                                        className="w-full h-auto max-h-[500px] object-cover shadow-lg"
                                    />
                                </Zoom> */}
                                <ImageSlider images={singleFacility?.data?.image} />
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col max-h-[400px]">
                            <h3 className="text-2xl md:text-4xl font-extrabold mb-5 mt-8">{singleFacility?.data?.name}</h3>
                            <p className="mt-8 text-xl md:text-2xl mb-5 flex items-center gap-2">
                                <span><MapPin /></span>
                                <span>{singleFacility?.data?.location}</span>
                            </p>
                            <p className="text-xl md:text-2xl mb-5 flex items-center gap-2">
                                <span><DollarSign /></span>
                                <span>{singleFacility?.data?.pricePerHour} hour</span>
                            </p>
                            <div className="mt-14">
                                <Button onClick={() => handleBookingPageRedirect(singleFacility?.data?._id)} className="rounded-full text-lg">Book now  <NotebookPen className="ml-2 w-5 h-5" /></Button>
                            </div>
                        </div>
                    </div>


                    {/* facility review,and details section start here  */}

                    <div className="my-10">
                        <div className="tabs flex space-x-4 mb-4">
                            <Button
                                className={`tab ${activeTab === "details" ? "active" : "bg-white text-black"} font-bold rounded-full`}
                                onClick={() => handleTabSwitch("details")}
                            >
                                Facility Details
                            </Button>
                            <Button
                                className={`tab ${activeTab === "reviews" ? "active" : "bg-white text-black"} font-bold rounded-full`}
                                onClick={() => handleTabSwitch("reviews")}
                            >
                                Reviews
                            </Button>
                        </div>

                        {activeTab === "details" && (
                            <div className="product-details">
                                {singleFacility?.data?.description ? (
                                    <article className="prose lg:prose-xl">
                                        <div
                                            className="w-full"
                                            dangerouslySetInnerHTML={{ __html: singleFacility?.data?.description }}
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
                                                    style="rounded-2xl"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium">Review Text</label>
                                                <textarea
                                                    className="w-full p-2 border-none focus:outline-none rounded-2xl drop-shadow-sm"
                                                    rows={4}
                                                    value={reviewText}
                                                    onChange={(e) => setReviewText(e.target.value)}
                                                    placeholder="Write your review here..."
                                                ></textarea>
                                            </div>

                                            <Button disabled={!user && !(user as any)?.id} type="submit" className="btn rounded-full text-white py-2 px-4 ">
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

                    <div className="mt-44">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-10 ">Some of others facilities</h1>
                        <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5">
                            {
                                allFacilities?.data?.filter((facility: any) => facility?._id !== facilityId)?.slice(0, 4)?.map((facility: any) => <FacilityCard key={facility?._id} facility={facility} styles="bg-[#2B2C2D] text-white" />)
                            }
                        </div>
                    </div>
                </div>

                <ScrollToTop />
            </section>
        </>

    )
};

export default FacilityDetails;