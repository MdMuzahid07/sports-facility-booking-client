import FacilityCars from "./FacilityCars";

const FeaturedFacilities = () => {
    return (
        <section className="pt-28 pb-32 bg-[#2E2E2E] text-slate-200">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-extrabold mb-5 ">Featured Facilities</h3>

                <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]?.map(() => <FacilityCars styles="border-slate-200" />)
                    }
                </div>
            </div>
        </section>
    )
};

export default FeaturedFacilities;