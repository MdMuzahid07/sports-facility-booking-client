/* eslint-disable @typescript-eslint/no-explicit-any */
import FacilityCars from "@/components/main/FacilityCars";
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
import { useState } from "react";

const Facilities = () => {
    const { data: allFacilities } = useGetAllFacilitiesQuery(undefined);
    const [price, setPrice] = useState<string | undefined>(undefined);
    const [searchFacility, setSearchFacility] = useState<string | undefined>(undefined);

    const handleFilterChange = (value: string) => {
        setPrice(value);
    };

    const handleSearch = (e: any) => {
        setSearchFacility(e.target.value)
    };

    // const totalFacilities = filteredFacilities?.length;
    // const facilityPerPage = 9

    // const totalPages = Math?.ceil(totalFacilities / facilityPerPage);
    // const paginatedFacilites = filteredFacilities?.slice(
    //     (currentPage - 1) * facilityPerPage,
    //     currentPage * facilityPerPage
    // );


    return (
        <section className="bg-slate-200">
            <div className="h-[300px] w-screen relative">
                <img className="h-full w-full object-cover" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725805321/Untitled_design_xi0qdl.png" alt="" />
            </div>
            <div className="max-w-7xl mx-auto px-4 xl:px-0 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-10">
                    {/* Search and Filter Section */}
                    <aside className="col-span-1 max-h-[700px] sticky top-24 bg-slate-100 p-6 w-full mb-10 lg:mb-0">
                        <h2 className="text-2xl font-extrabold  mb-10">Filter Facility</h2>
                        {/* Search Input */}
                        <div className="mb-8">
                            <label className="block font-semibold mb-2">Search Facility</label>
                            <Input
                                type="text"
                                className="rounded-none"
                                placeholder="write here..."
                                value={searchFacility}
                                onChange={handleSearch}
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Filter by price</label>
                            <Select value={price} onValueChange={handleFilterChange}>
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
                            // paginatedFacilites?.length > 0 ? (
                            allFacilities?.data?.map((facility: any) => (
                                <FacilityCars key={facility?._id} styles="bg-[#1F1F1F] text-white" facility={facility} />
                            ))
                            // ) : (
                            //     <p className=" text-lg col-span-full">No facility found.</p>
                            // )
                        }
                    </div>
                </div>
                {/* <div className="flex justify-end mt-8">
                    <nav>
                        <ul className="flex items-center space-x-2">
                            {Array?.from({ length: totalPages }, (_, index) => (
                                <li key={index}>
                                    <button onClick={() => handlePageChange(index + 1)} className="w-7 h-7 flex justify-center items-center  border border-green-900 hover:bg-green-900 hover:text-white">{index + 1}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div> */}
            </div>
        </section>
    )
};

export default Facilities;