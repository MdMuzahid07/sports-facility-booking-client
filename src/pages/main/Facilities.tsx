/* eslint-disable @typescript-eslint/no-explicit-any */
import FacilityCard from "@/components/main/FacilityCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetAllFacilitiesQuery } from "@/redux/features/facilities/facilityApi";
import PageTopByDefault from "@/utils/PageTopByDefault";
import { useMemo, useState } from "react";

const Facilities = () => {
    const { data: allFacilities } = useGetAllFacilitiesQuery(undefined);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handleSearch = (e: any) => {
        setSearchQuery(e.target.value);
    };

    const filteredFacilities = useMemo(() => {
        if (!searchQuery.trim()) {
            return allFacilities?.data || [];
        }

        return allFacilities?.data?.filter((facility: any) => {
            return (
                facility?.name.toLowerCase().includes(searchQuery.trim()) || facility?.location.toLowerCase().includes(searchQuery.trim())
            )
        });

    }, [searchQuery, allFacilities]);


    // pagination
    const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredFacilities.slice(startIndex, endIndex);
    }, [currentPage, filteredFacilities]);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    PageTopByDefault();

    return (
        <section className="bg-slate-200">
            <section className="h-[300px] w-screen relative">
                <img className="h-full w-full object-cover" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725805321/Untitled_design_xi0qdl.png" alt="" />
            </section>
            <div className="max-w-7xl mx-auto px-4 xl:px-0 py-32">
                <section className="grid grid-cols-1 lg:grid-cols-4 lg:gap-10">
                    {/* Search and Filter Section */}
                    <aside className="col-span-1 max-h-[700px] sticky top-24 bg-slate-100 p-6 w-full mb-10 lg:mb-0">
                        <h2 className="text-2xl font-extrabold  mb-10">Filter Facility</h2>
                        {/* Search Input */}
                        <div className="mb-8">
                            <label className="block font-semibold mb-2">Search Facility</label>
                            <Input
                                value={searchQuery}
                                onChange={handleSearch}
                                type="text"
                                className="rounded-none"
                                placeholder="write here..."
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Filter by price</label>
                            <Select>
                                <SelectTrigger className="w-full rounded-none">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent className="rounded-none">
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </aside>

                    <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {
                            currentItems?.map((facility: any) => (
                                <FacilityCard key={facility?._id} styles="bg-[#1F1F1F] text-white" facility={facility} />
                            ))
                        }
                    </div>

                </section>
                <section className="flex w-full items-center gap-6 justify-end mt-14">
                    {/* Array.form  This creates an array of a specific length (totalPages in this case) */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            className="rounded-none"
                            key={index}
                            onClick={() => handleChangePage(index + 1)}
                            //  disables the button for the currently active page, so user can't re select the page they are already on.
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </section>
            </div>
        </section>
    )
};

export default Facilities;