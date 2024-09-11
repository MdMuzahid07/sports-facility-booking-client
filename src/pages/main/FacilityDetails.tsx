/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { DollarSign, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetAllFacilitiesQuery, useGetASingleFacilityQuery } from '@/redux/features/facilities/facilityApi';
import PageTopByDefault from '@/utils/PageTopByDefault';
import FacilityCard from '@/components/main/FacilityCard';

const FacilityDetails = () => {
    const { facilityId } = useParams();
    const { data: allFacilities } = useGetAllFacilitiesQuery(undefined);
    const { data: singleFacility } = useGetASingleFacilityQuery(facilityId);
    const navigate = useNavigate();

    const img = "https://res.cloudinary.com/dymo0iyee/image/upload/v1725689329/1752_x3nrjw.jpg"


    const handleBookingPageRedirect = (id: string) => {
        navigate(`/facility-booking/${id}`);
    };

    PageTopByDefault();

    return (
        <div className="bg-slate-200 py-32 px-4 xl:px-0">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="col-span-3 flex justify-center items-center">
                        <div className="w-full">
                            <Zoom>
                                <img
                                    src={img}
                                    alt="image"
                                    className="w-full h-auto max-h-[500px] object-cover shadow-lg"
                                />
                            </Zoom>
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <h3 className="text-2xl md:text-4xl font-extrabold mb-5 mt-8">{singleFacility?.data?.name}</h3>
                        <p className="mt-8 text-xl md:text-2xl mb-5 flex items-center gap-2">
                            <span><MapPin /></span>
                            <span>{singleFacility?.data?.location}</span>
                        </p>
                        <p className="text-xl md:text-2xl mb-5 flex items-center gap-2">
                            <span><DollarSign /></span>
                            <span>{singleFacility?.data?.price} hour</span>
                        </p>
                        <div className="mt-14">
                            <Button onClick={() => handleBookingPageRedirect(singleFacility?.data?._id)} className="rounded-none text-2xl">Book now</Button>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <p className="text-xl md:text-2xl">
                        {singleFacility?.data?.description}
                    </p>
                </div>
                <div className="mt-44">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-10 ">Some of others facilities</h1>
                    <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5">
                        {
                            allFacilities?.data?.map((facility: any) => <FacilityCard key={facility?._id} facility={facility} styles="bg-[#2B2C2D] text-white" />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FacilityDetails;