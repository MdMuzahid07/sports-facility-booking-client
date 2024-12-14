import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetAllFacilitiesQuery } from "@/redux/features/facilities/facilityApi";
import FacilityCard from "../FacilityCard";

/* eslint-disable @typescript-eslint/no-explicit-any */
const FeaturedFacilities = () => {
    const { data: allFacilities, isLoading } = useGetAllFacilitiesQuery(undefined);

    return (
        <section className="pt-28 pb-32 bg-slate-200 text-slate-200">
            <div className="max-w-7xl mx-auto px-4 xl:px-0">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-[#232323]">Our Featured Facilities</h2>
                <p className="text-xl md:text-2xl lg:text-3xl text-[#232323]">Experience the Best Services Designed for Your Ultimate Comfort.</p>

                <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 mt-16">
                    {
                        isLoading ? <LoadingSpinner /> :
                            allFacilities?.data?.slice(2, 5).map((facility: any) => (
                                <FacilityCard key={facility?._id} styles="bg-[#1F1F1F] text-white" facility={facility} />
                            ))
                    }
                </div>
            </div>
        </section>
    );
};

export default FeaturedFacilities;