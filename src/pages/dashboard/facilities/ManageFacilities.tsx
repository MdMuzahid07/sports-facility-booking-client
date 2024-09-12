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
import { toast } from "sonner"
import { useDeleteAFacilityMutation, useGetAllFacilitiesQuery } from "@/redux/features/facilities/facilityApi"
import { useNavigate } from "react-router-dom"


const ManageFacilities = () => {
    const { data: allFacilities } = useGetAllFacilitiesQuery(undefined);
    const [deleteAFacility, { error }] = useDeleteAFacilityMutation();
    const navigate = useNavigate();

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
                    toast.error(`${error?.data?.message}`, { id: "deleteId" });
                }
            } catch (error) {
                toast.error(`${error?.data?.message}`, { id: "deleteId" });
            }
        }
    };


    const handleUpdateFacility = (id: string) => {
        navigate(`/dashboard/update-facility/${id}`);
    };


    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                Manage Facilities
            </h1>
            <section className="mt-14">
                <Table className="bg-white rounded-lg">
                    <TableCaption>A list of facilities</TableCaption>
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
                        {allFacilities?.data?.map((facility: any, index: any) => (
                            <TableRow key={facility?._id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>
                                    <img className="w-32 h-20 rounded-lg object-cover" src={facility?.image} alt="" />
                                </TableCell>
                                <TableCell>{facility?.name}</TableCell>
                                <TableCell>{facility?.location}</TableCell>
                                <TableCell>${facility?.pricePerHour} hour</TableCell>
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
            </section>
        </div>
    )
};

export default ManageFacilities;