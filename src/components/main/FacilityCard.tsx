/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";


const FacilityCard = ({ facility, styles }: any) => {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const navigate = useNavigate();


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
                <Card className={`w-full rounded-none border-none bg-slate-200 ${styles}`}>
                    <CardHeader className="p-0 mb-3">
                        <img className="w-full h-full object-contain object-center" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725689329/1752_x3nrjw.jpg" alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>{facility?.name}</CardTitle>
                        <CardDescription className="mt-2">{facility?.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button onClick={() => handleRedirectToDetails(facility?._id)} className="rounded-none">Details</Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div >
    );
};

export default memo(FacilityCard);
