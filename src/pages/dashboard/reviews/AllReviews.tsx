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


const reviews = [
    {
        _id: "67627bb71d58f363c6b0b229",
        userId: "66e176749e05ce6aaaedbcac",
        facilityOrProductId: "676072ad97f1b9dfd45ee9fe",
        rating: "5",
        reviewText: "This review is for testing purposes, it's undergoing development.",
        reviewImages: ["image1.jpg", "image2.jpg", "image3.jpg"],
        createdAt: "2024-12-18T07:37:27.789+00:00",
        updatedAt: "2024-12-18T07:37:27.789+00:00",
    },
    // Add more review objects here
];

const AllReviews = () => {

    const allReviews = { data: reviews }


    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl font-bold">
                All Reviews
            </h1>
            <section className="mt-6">
                <Table className="bg-white rounded-2xl drop-shadow-sm">
                    <TableCaption className="text-lg font-bold">User reviews</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No.</TableHead>
                            <TableHead className="w-[150px]">Reviewer ID</TableHead>
                            <TableHead>Facility/Product ID</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Review Text</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allReviews?.data?.map((review: any, index: any) => (
                            <TableRow key={review?._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{review?.userId || "N/A"}</TableCell>
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

export default AllReviews;