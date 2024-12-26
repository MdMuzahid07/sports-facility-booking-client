/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useGetAllFacilitiesQuery } from "@/redux/features/facilities/facilityApi";
import { useNavigate } from "react-router-dom";

const WinterSaleFacilities = () => {
    const { data, isLoading } = useGetAllFacilitiesQuery(undefined);
    const navigate = useNavigate();

    const filtered = data?.data?.filter((facility: any) =>
        ["Indoor Basketball Court", "Grass Tennis Court"].includes(facility?.name)
    );


    const handleRedirectToDetails = (id: string) => {
        navigate(`/facility-details/${id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <section className="pt-28 pb-32 bg-[#2E2E2E] text-slate-200">
            <div className="max-w-7xl mx-auto px-4 xl:px-0">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-white">Winter Sale</h2>
                <p className="text-xl md:text-2xl lg:text-3xl">Stay Healthy, Stay Active, Save Big!</p>

                {
                    isLoading ? (<LoadingSpinner />) : (
                        <section className="grid md:grid-cols-2 gap-8 mt-16">
                            {
                                filtered?.map((facility: any) => (

                                    <div
                                        className="relative bg-cover bg-center h-96 flex items-center justify-start"
                                        style={{
                                            backgroundImage: `url(${facility?.image?.[0]})`,
                                        }}
                                    >
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                                        {/* Content */}
                                        <div className="relative z-10 px-6 md:px-12">
                                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                                {facility?.name}
                                            </h2>
                                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                                                {facility?.name}...
                                            </p>
                                            <Button onClick={() => handleRedirectToDetails(facility?._id)} className="mt-6 rounded-none text-2xl md:text-3xl lg:text-4xl">View More</Button>

                                        </div>
                                    </div>
                                ))
                            }
                        </section>
                    )
                }
            </div>
        </section>
    )
}

export default WinterSaleFacilities;