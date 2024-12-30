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
import { toast } from "sonner"
import { useDeleteAFacilityMutation, useGetAllFacilitiesQuery } from "@/redux/features/facilities/facilityApi"
import { useNavigate } from "react-router-dom"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

import { useMemo, useState } from "react"

type TError = {
    message?: string;
};

const ManageFacilities = () => {
    const { data: allFacilities } = useGetAllFacilitiesQuery(undefined);
    const [deleteAFacility, { error }] = useDeleteAFacilityMutation();
    const navigate = useNavigate();
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete = async (id: string) => {
        const proceed = window.confirm("Delete facility");
        if (proceed) {
            try {
                toast.loading("Loading...", { id: "deleteId" });
                const res = await deleteAFacility(id).unwrap();
                if (res?.success) {
                    toast.success("Facility deleted successfully", { id: "deleteId" });
                }
                else {
                    if (error) {
                        if ("data" in error && (error as FetchBaseQueryError).data) {
                            toast.error(`${((error as FetchBaseQueryError).data as TError)?.message || "Something went wrong!"}`, { id: "deleteId" });
                        } else {
                            toast.error(`Something went wrong!`, { id: "deleteId" });
                        }
                    };
                }
            } catch (error) {
                toast.error(`Something went wrong!`, { id: "deleteId" });
            }
        }
    };


    const handleUpdateFacility = (id: string) => {
        navigate(`/dashboard/update-facility/${id}`);
    };




    // pagination
    const totalPages = Math.ceil(allFacilities?.data?.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allFacilities?.data?.slice(startIndex, endIndex);
    }, [allFacilities, currentPage]);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };



    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl font-bold">
                Manage Facilities
            </h1>
            <section className="mt-6">
                <Table className="bg-white rounded-t-2xl drop-shadow-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Appearance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems?.map((facility: any, index: any) => (
                            <TableRow key={facility?._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>
                                    <img className="w-12 h-12 rounded-full object-cover object-center" src={facility?.image?.[0]} alt="" />
                                </TableCell>
                                <TableCell>{facility?.name}</TableCell>
                                <TableCell>{facility?.location}</TableCell>
                                <TableCell>${facility?.pricePerHour} hour</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="flex items-center gap-2 h-10 rounded-full">
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
                                                    onClick={() => handleUpdateFacility(facility?._id)}
                                                    className="font-bold">
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    <span>Update</span>
                                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(facility?._id)} className="font-bold">
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    <span>Delete</span>
                                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <section className="bg-white flex items-center gap-4 justify-end rounded-b-2xl p-3 border-t pr-10">

                    {/* Array.form  This creates an array of a specific length (totalPages in this case) */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            className={`rounded-full w-10 h-10 flex items-center justify-center ${currentPage === index + 1 ? "bg-black text-white" : "bg-slate-300 text-black border"}`}
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


        </div >
    )
};

export default ManageFacilities;














