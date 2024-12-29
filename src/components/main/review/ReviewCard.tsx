/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteAReviewMutation } from "@/redux/features/review/review.api";
import { useAppSelector } from "@/redux/hooks";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ReviewCard = ({ review }: any) => {
    const ratingNumber = Number(review?.rating);
    const user = useAppSelector((state) => state.auth.user);
    const ratings = Array.from({ length: ratingNumber }, (_, index) => index + 1);
    const [deleteAReview, { data, isLoading, error }] = useDeleteAReviewMutation();


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
        toast.loading("Creating...", { id: "deleteReviewToastId" });
    }

    if (error) {
        toast.error((error as any)?.data?.message, { id: "deleteReviewToastId" });
    }

    if (data && data?.success) {
        toast.success("Done", { id: "deleteReviewToastId" });
    }



    return (
        <div className="border-b border-slate-300 p-4 flex gap-4 relative bg-slate-100 rounded-2xl drop-shadow-sm">

            <div className="absolute right-4 top-4">
                {
                    (!user || !((user as any)?.id === review?.userId?._id)) ? (
                        <span title="this review given by other users, not edit, or deletable">
                            <EllipsisVertical className="w-5 h-5 text-slate-400 hover:text-black" />
                        </span>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger><EllipsisVertical className="w-5 h-5 text-slate-400 hover:text-black" /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className="text-slate-300"><Pencil className="w-4 h-4" /><span className="pl-2">Edit</span> <span className="text-xs ml-2 text-red-500 opacity-50">{`feature loading`}</span></DropdownMenuItem>
                                <DropdownMenuItem >
                                    <button onClick={() => handleDelete((user as any)?.id, review?._id)} className="w-full flex items-center">
                                        <Trash2 className="w-4 h-4" /><span className="pl-2">Delete</span>
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </div>

            <div className="w-16 h-16">
                <img
                    src={review?.userId?.avatar}
                    alt={`${review?.userId?.name}'s review`}
                    className="w-full h-full object-cover rounded-full"
                />
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-semibold">{review?.name}</h3>

                <div className="flex items-center my-2">
                    {ratings?.map((star: number) => (
                        <span
                            key={star + Math.random()}
                            className={`text-xl ${review?.rating >= star ? "text-yellow-500" : "text-gray-300"
                                }`}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <p className="text-sm text-gray-700">{review?.reviewText}</p>

                <div className="flex flex-wrap gap-4 mt-5">
                    {
                        review?.reviewImages?.map((image: string, index: number) => (
                            <img key={index + image} className="w-20 h-20 rounded-xl object-cover object-center" src={image} alt="" />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;