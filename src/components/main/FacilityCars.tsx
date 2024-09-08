/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { motion, useInView } from "framer-motion";


const FacilityCars = ({ styles }: any) => {
    const ref = useRef(null);
    const isInView = useInView(ref);

    return (
        <div ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Card className={`w-full  rounded-none border-none bg-slate-200 ${styles}`}>
                    <CardHeader className="p-0 mb-3">
                        <img className="w-full h-full object-contain object-center" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725689329/1752_x3nrjw.jpg" alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button className="rounded-none">Details</Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
};

export default FacilityCars;
