/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pencil, Settings, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDeleteAProductMutation, useGetAllProductsQuery } from "@/redux/features/products/productApi"
import { toast } from "sonner"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useMemo, useState } from "react"


const ManageProducts = () => {
    const { data: allProducts, isLoading: isLoadingProduct } = useGetAllProductsQuery(undefined);
    const [deleteAProduct, { data, isLoading, error }] = useDeleteAProductMutation();
    const navigate = useNavigate();
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete = async (productId: string) => {
        console.log(productId)
        const proceed = window.confirm("delete product?");
        if (proceed) {
            await deleteAProduct(productId).unwrap();
        }
    };


    // pagination
    const totalPages = Math.ceil(allProducts?.data?.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allProducts?.data?.slice(startIndex, endIndex);
    }, [allProducts, currentPage]);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };






    const handleUpdateProduct = (productId: string) => {
        navigate(`/dashboard/update-product/${productId}`);
    };

    if (isLoading) {
        toast.loading("Deleting...", { id: "productDeleteToastId" })
    }
    if (error) {
        toast.error((error as any)?.data?.message, { id: "productDeleteToastId" })
    }
    if (data && data?.success) {
        toast.success("Done", { id: "productDeleteToastId" })
    }





    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl font-bold">
                Manage Products
            </h1>
            <section className="mt-6">
                <Table className="bg-white rounded-t-2xl drop-shadow-sm">

                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Appearance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoadingProduct ? (
                            <div className="w-full min-h-[50vh] flex justify-center items-center">
                                <LoadingSpinner />
                            </div>
                        ) :
                            (
                                currentItems?.map((product: any, index: any) => (
                                    <TableRow key={product?._id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>
                                            <img className="w-12 h-12 rounded-full object-cover object-center" src={product?.imageUrl[0]} alt="" />
                                        </TableCell>
                                        <TableCell>{product?.title}</TableCell>
                                        <TableCell>{product?.stock}</TableCell>
                                        <TableCell>${product?.price}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" className="flex items-center gap-2 rounded-full">
                                                        <span>
                                                            <Settings size={15} />
                                                        </span>
                                                        <span>
                                                            Options
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56">
                                                    <DropdownMenuLabel className="font-bold">
                                                        Appearance
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />

                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem
                                                            onClick={() => handleUpdateProduct(product?._id)}
                                                            className="font-bold">
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            <span>Update</span>
                                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(product?._id)} className="font-bold">
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            <span>Delete</span>
                                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>

                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
                <section className="bg-white flex items-center gap-4 justify-end rounded-b-2xl p-3 border-t pr-10">

                    {/* Array.form  This creates an array of a specific length (totalPages in this case) */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            className={`rounded-lg w-9 h-9 flex items-center justify-center ${currentPage === index + 1 ? "bg-black text-white" : "bg-slate-300 text-black border"}`}
                            key={index}
                            onClick={() => handleChangePage(index + 1)}
                            //  disables the button for the currently active page, so user can't re select the page they are already on.
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                </section>
            </section>
        </div>
    )
};

export default ManageProducts;