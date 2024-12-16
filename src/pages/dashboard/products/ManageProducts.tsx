/* eslint-disable @typescript-eslint/no-unused-vars */
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


const ManageProducts = () => {
    const { data: allProducts, isLoading: isLoadingProduct } = useGetAllProductsQuery(undefined);
    const [deleteAProduct, { data, isLoading, error }] = useDeleteAProductMutation();
    const navigate = useNavigate();


    const handleDelete = async (productId: string) => {
        console.log(productId)
        const proceed = window.confirm("delete product?");
        if (proceed) {
            await deleteAProduct(productId).unwrap();
        }
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
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                Manage Products
            </h1>
            <section className="mt-14">
                <Table className="bg-white rounded-lg">
                    <TableCaption>A list of Products</TableCaption>
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
                        {isLoadingProduct ? (<LoadingSpinner />) :
                            (
                                allProducts?.data?.map((product: any, index: any) => (
                                    <TableRow key={product?._id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>
                                            <img className="w-16 h-14 rounded-lg object-cover object-center" src={product?.imageUrl[0]} alt="" />
                                        </TableCell>
                                        <TableCell>{product?.title}</TableCell>
                                        <TableCell>{product?.stock}</TableCell>
                                        <TableCell>${product?.price}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button className="flex items-center gap-2">
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
            </section>
        </div>
    )
};

export default ManageProducts;