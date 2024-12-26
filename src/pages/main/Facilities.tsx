/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingSpinner from "@/components/LoadingSpinner";
import FacilityCard from "@/components/main/FacilityCard";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetAllFacilitiesQuery } from "@/redux/features/facilities/facilityApi";
import PageTopByDefault from "@/utils/PageTopByDefault";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";

const Facilities = () => {
    const { data: allFacilities, isLoading } = useGetAllFacilitiesQuery(undefined);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const itemsPerPage = 6;

    const handleFilterByPriceChange = (value: any) => {
        const [minPrice, maxPrice] = value.split('-').map(Number);
        setPriceRange([minPrice, maxPrice]);
    };

    const handleSearch = (e: any) => {
        setSearchQuery(e.target.value);
    };

    const filteredFacilities = useMemo(() => {
        if (!searchQuery.trim() && !priceRange) {
            return allFacilities?.data || [];
        }
        return allFacilities?.data?.filter((facility: any) => {

            const isNameOrLocationMatching = facility?.name.toLowerCase().includes(searchQuery.trim()) || facility?.location.toLowerCase().includes(searchQuery.trim());

            const filterByPrice = facility?.pricePerHour >= priceRange[0] && facility?.pricePerHour <= priceRange[1];

            return isNameOrLocationMatching && filterByPrice;
        });

    }, [searchQuery, allFacilities, priceRange]);


    // pagination
    const totalPages = Math.ceil(filteredFacilities?.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredFacilities?.slice(startIndex, endIndex);
    }, [currentPage, filteredFacilities]);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    PageTopByDefault();

    return (
        <>
            <Helmet>
                <title>PlayTime Pro | All Facilities</title>
                <meta
                    name="description"
                    content="PlayTime Pro, all sports facilities page"
                />
            </Helmet>

            <section className="bg-slate-200">
                <div className="max-w-7xl mx-auto px-4 xl:px-0 py-32">
                    <h3 className="text-3xl md:text-5xl font-extrabold mb-5">Facilities</h3>
                    <p className="text-xl md:text-2xl lg:text-3xl">
                        Explore world-class facilities designed to elevate your experience. Discover everything you need to achieve your goals and enjoy unmatched comfort.
                    </p>

                    <section className="grid grid-cols-1 lg:grid-cols-4 lg:gap-10 mt-20">
                        {/* Search and Filter Section */}
                        <aside className="col-span-1 max-h-[700px] sticky top-24 bg-slate-100 p-6 w-full mb-10 lg:mb-0">
                            <h2 className="text-2xl font-extrabold  mb-10">Filter Facility</h2>
                            {/* Search Input */}
                            <section className="mb-8">
                                <label className="block font-semibold mb-2">Search Facility</label>
                                <Input
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    type="text"
                                    className="rounded-none"
                                    placeholder="write here..."
                                />
                            </section>

                            <section>
                                <label className="block font-semibold mb-2">Filter by price</label>
                                <Select onValueChange={(value) => handleFilterByPriceChange(value)}>
                                    <SelectTrigger className="w-full rounded-none">
                                        <SelectValue placeholder="Select price range" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-none">
                                        <SelectGroup>
                                            <SelectItem value="0-200">All</SelectItem>
                                            <SelectItem value="10-30">10 - 30</SelectItem>
                                            <SelectItem value="30-60">30 - 60</SelectItem>
                                            <SelectItem value="60-90">60 - 90</SelectItem>
                                            <SelectItem value="90-120">90 - 120</SelectItem>
                                            <SelectItem value="120-150">120 - 150</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </section>
                        </aside>

                        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {
                                isLoading ? <LoadingSpinner /> :
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

                <ScrollToTop />
            </section>
        </>

    )
};

export default Facilities;