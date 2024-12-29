/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, Trash } from "lucide-react"
import { useDeleteAReviewMutation, useGetAllReviewQuery } from "@/redux/features/review/review.api";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";


const MyReviews = () => {
    const { data } = useGetAllReviewQuery(undefined);
    const user = useAppSelector((state) => state?.auth?.user);
    const [deleteAReview, { data: deleteReviewData, isLoading, error }] = useDeleteAReviewMutation();

    const userReviews = data?.data?.filter((review: any) => review?.userId?._id === user?.id);



    const handleDelete = async (userId: string, reviewId: string) => {
        const confirm = window.confirm("Delete review?");
        if (!confirm) {
            return;
        }
        try {
            await deleteAReview({ reviewId: reviewId, userId: userId });
        } catch (error) {
            console.log(error);
        }
    };


    if (isLoading) {
        toast.loading("Deleting...", { id: "deleteReviewToastId" });
    }

    if (error) {
        toast.error((error as any)?.data?.message, { id: "deleteReviewToastId" });
    }

    if (deleteReviewData && deleteReviewData?.success) {
        toast.success("Done", { id: "deleteReviewToastId" });
    }




    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl font-bold">
                My Reviews
            </h1>
            <section className="mt-6">
                <Table className="bg-white rounded-2xl drop-shadow-sm">
                    <TableCaption className="text-lg font-bold">User reviews</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No.</TableHead>
                            <TableHead className="w-[150px]">User Image</TableHead>
                            <TableHead className="w-[150px]">Name</TableHead>
                            <TableHead>Facility/Product ID</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Review Text</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userReviews?.map((review: any, index: any) => (
                            <TableRow key={review?._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>
                                    <img className="w-12 h-12 rounded-full object-cover object-center" src={review?.userId?.avatar} alt="" />
                                </TableCell>
                                <TableCell>{review?.userId?.name || "N/A"}</TableCell>
                                <TableCell>{review?.facilityOrProductId || "N/A"}</TableCell>
                                <TableCell>{review?.rating || "N/A"}</TableCell>
                                <TableCell>{review?.reviewText || "N/A"}</TableCell>

                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="flex items-center rounded-full gap-2">
                                                <Settings size={15} />
                                                Options
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {/* {
                                                (review?.paymentMethod === "Pending") && <DropdownMenuItem
                                                    // onClick={() => handleUpdatereview(review?._id)}
                                                    className="font-bold"
                                                >
                                                    <CircleDollarSign className="mr-2 h-4 w-4" />
                                                    Make Payment
                                                </DropdownMenuItem>
                                            } */}
                                            <DropdownMenuItem
                                                onClick={() => handleDelete((user as any)?.id, review?._id)}
                                                className="font-bold text-red-600"
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete Review
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </div>
    )
}

export default MyReviews;