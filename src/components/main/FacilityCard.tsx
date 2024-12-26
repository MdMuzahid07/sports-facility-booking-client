/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetAllReviewQuery } from "@/redux/features/review/review.api";


const FacilityCard = ({ facility, styles }: any) => {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const navigate = useNavigate();
    const facilityId = facility?._id;

    const { data: reviews } = useGetAllReviewQuery(facilityId);
    const filteredReviews = reviews?.data?.filter(({ facilityOrProductId }: { facilityOrProductId: string }) => facilityOrProductId === facilityId);
    // const ratingNumber = Number(filteredReviews?.rating);
    // const ratings = Array.from({ length: ratingNumber }, (_, index) => index + 1);

    const handleRedirectToDetails = (id: string) => {
        navigate(`/facility-details/${id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Card className={`w-full  min-h-[400px] relative rounded-none border-none bg-slate-200 ${styles} border-2 transition-all duration-200 delay-100 hover:shadow-xl bg-primary hover:shadow-[#2E2E2E] hover:-translate-y-2 hover:scale-105 rounded-none border-slate-100 hover:border-[#2E2E2E]`}>
                    <CardHeader className="p-0 mb-3 ">
                        <img className="w-full h-[200px] object-cover object-center" src={facility?.image ? facility?.image[0] : "https://res.cloudinary.com/dymo0iyee/image/upload/v1725689329/1752_x3nrjw.jpg"} alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>{facility?.name}</CardTitle>
                        <CardTitle className="mt-2 text-md flex justify-between items-center">
                            <p className="font-semibold text-xs">Reviews ({filteredReviews?.length})</p>
                            <p className="font-semibold">${facility?.pricePerHour} hour</p>
                        </CardTitle>

                        <CardDescription className="mt-2">{facility?.name}...</CardDescription>
                    </CardContent>
                    <CardFooter className="absolute bottom-0 right-0">
                        <Button onClick={() => handleRedirectToDetails(facility?._id)} className="rounded-full bg-slate-700">Details</Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div >
    );
};

export default memo(FacilityCard);
