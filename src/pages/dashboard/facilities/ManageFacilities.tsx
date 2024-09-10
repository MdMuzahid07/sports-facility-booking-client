import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
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
import { useState } from "react"
import { Pencil, Trash } from "lucide-react"
import { toast } from "sonner"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const facilities = [
    {
        "name": "Product A",
        "location": "Warehouse 1",
        "price": 19.99
    },
    {
        "name": "Product B",
        "location": "Warehouse 2",
        "price": 24.95
    },
    {
        "name": "Product C",
        "location": "Store A",
        "price": 15.99
    },
    {
        "name": "Product D",
        "location": "Store B",
        "price": 29.99
    },
    {
        "name": "Product E",
        "location": "Online Store",
        "price": 17.99
    },
    {
        "name": "Product F",
        "location": "Warehouse 1",
        "price": 22.95
    },
    {
        "name": "Product G",
        "location": "Store A",
        "price": 18.99
    },
    {
        "name": "Product H",
        "location": "Store B",
        "price": 27.99
    },
    {
        "name": "Product I",
        "location": "Online Store",
        "price": 20.99
    },
    {
        "name": "Product J",
        "location": "Warehouse 2",
        "price": 25.95
    }
]


const ManageFacilities = () => {

    const handleDelete = () => {
        const proceed = window.confirm("Delete facility");
        if (proceed) {
            toast.success("Facility deleted successfully");
        }
    };


    return (
        <div className="py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                Manage Facilities
            </h1>
            <section className="mt-14">
                <Table className="bg-white rounded-lg">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No.</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Appearance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {facilities?.map(({ name, location, price }, index) => (
                            <TableRow key={price + Math.random()}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{location}</TableCell>
                                <TableCell>{price}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button>Options</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuLabel className="font-bold">Appearance</DropdownMenuLabel>
                                            <DropdownMenuSeparator />

                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className="font-bold">
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    <span>Update</span>
                                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete()} className="font-bold">
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