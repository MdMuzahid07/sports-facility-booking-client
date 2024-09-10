import { useNavigate } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { DollarSign, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FacilityCars from '@/components/main/FacilityCars';

const FacilityDetails = () => {
    // const { facilityId } = useParams();
    const navigate = useNavigate();

    const img = "https://res.cloudinary.com/dymo0iyee/image/upload/v1725689329/1752_x3nrjw.jpg"


    const handleBookingPageRedirect = (id: string) => {
        navigate(`/facility-booking/${id}`);
    };


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
                        <h3 className="text-2xl md:text-4xl font-extrabold mb-5 mt-8">Basketball</h3>
                        <p className="mt-8 text-xl md:text-2xl mb-5 flex items-center gap-2">
                            <span><MapPin /></span>
                            <span>Dhaka</span>
                        </p>
                        <p className="text-xl md:text-2xl mb-5 flex items-center gap-2">
                            <span><DollarSign /></span>
                            <span>30 hour</span>
                        </p>
                        <div className="mt-14">
                            <Button onClick={() => handleBookingPageRedirect("9087nb6876v")} className="rounded-none text-2xl">Book now</Button>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <p className="text-xl md:text-2xl">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam quia iure possimus commodi tempora magni harum soluta cupiditate dolorem eligendi?
                    </p>
                </div>
                <div className="mt-44">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-10 ">Some of others facilities</h1>
                    <div className="w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5">
                        {
                            [1, 2, 3, 4, 5]?.map(() => <FacilityCars styles="bg-[#2B2C2D] text-white" />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FacilityDetails;