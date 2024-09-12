/* eslint-disable @typescript-eslint/no-explicit-any */
const FeaturedFacilities = () => {
    return (
        <section className="pt-28 pb-32 bg-[#2E2E2E] text-slate-200">
            <div className="max-w-7xl mx-auto px-4 xl:px-0">
                <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Featured Facilities</h2>
                <div className="space-y-12">
                    {/* Featured Item 1 */}
                    <div className="flex flex-col sm:flex-row items-center bg-[#141313] rounded-lg overflow-hidden">
                        <img
                            src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725725369/2150465472_h8vplw.jpg"
                            alt="State-of-the-Art Gym"
                            className="w-full sm:w-1/2 h-96 object-cover"
                        />
                        <div className="p-8 sm:w-1/2 space-y-4">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-white">Judo, Gym</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Transform your fitness goals into reality at our state-of-the-art gym, where cutting-edge equipment meets a motivating environment. Our gym is equipped with the latest in cardiovascular, strength, and flexibility training equipment, designed to cater to a wide range of fitness levels and preferences. Whether you're aiming to build muscle, lose weight, or simply stay active, our diverse selection of machines and free weights ensures a comprehensive workout
                            </p>
                        </div>
                    </div>

                    {/* Featured Item 2 */}
                    <div className="flex flex-col sm:flex-row-reverse items-center bg-[#141313] rounded-lg overflow-hidden">
                        <img
                            src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725689329/1752_x3nrjw.jpg"
                            alt="Multi-purpose Courts"
                            className="w-full sm:w-1/2 h-96 object-cover"
                        />
                        <div className="p-8 sm:w-1/2 space-y-4">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-white">Outdoor Sports</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Unleash your potential and embrace the great outdoors with our premier outdoor sports facilities. Designed to cater to a wide range of athletic pursuits, our facilities offer vibrant spaces where you can engage in everything from soccer and tennis to running and cycling. Set against picturesque landscapes, our well-maintained fields, courts, and tracks provide the perfect backdrop for both casual play and competitive events.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedFacilities;