/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllFacilitiesQuery } from "@/redux/features/facilities/facilityApi";
import FacilityCars from "./FacilityCars";

const FeaturedFacilities = () => {
    const { data: allFacilities } = useGetAllFacilitiesQuery(undefined);


    return (
        <section className="pt-28 pb-32 bg-[#2E2E2E] text-slate-200">
            <div className="max-w-7xl mx-auto px-4 xl:px-0">
                <h3 className="text-3xl md:text-5xl font-extrabold mb-5">Featured Facilities</h3>

                <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        allFacilities?.data?.map((facility: any) => <FacilityCars
                            key={facility?._id} facility={facility} styles="border-slate-200" />)
                    }
                </div>
            </div>
        </section>
    )
};

export default FeaturedFacilities;