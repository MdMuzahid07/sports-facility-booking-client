import { useGetASingleBookingsUserQuery } from "@/redux/features/bookings/bookingsApi";
import { useParams } from "react-router-dom";

const MyBookingDetails = () => {
    const { myBookingId } = useParams();
    const { data: booking } = useGetASingleBookingsUserQuery(myBookingId, { skip: !myBookingId });
    const { facility, user, date, startTime, endTime, payableAmount, isBooked } =
        booking?.data || [];

    return (
        <section className="max-w-7xl mx-auto px-4 xl:px-0 py-10">
            <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                Booking Details
            </h1>
            <section className="bg-white rounded-lg p-6 mt-14">

                {/* Facility Information */}
                <section className="mb-6">
                    <h3 className="text-2xl font-extrabold text-primary">Facility</h3>
                    <section className="grid md:grid-cols-2 mt-4 gap-6">
                        <div>
                            <img
                                className="w-full max-h-[500px] rounded-lg"
                                src={facility?.image?.[0]}
                                alt={facility?.name}
                            />
                            <div className="flex lg:flex-row gap-8 mt-8">
                                {/* User Information */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-extrabold text-primary">User</h3>
                                    <div className="mt-4">
                                        <p className="text-primary text-xl">
                                            <strong>Name:</strong> {user?.name}
                                        </p>
                                        <p className="text-primary text-xl">
                                            <strong>Email:</strong> {user?.email}
                                        </p>
                                        <p className="text-primary text-xl">
                                            <strong>Phone:</strong> {user?.phone}
                                        </p>
                                        <p className="text-primary text-xl">
                                            <strong>Address:</strong> {user?.address}
                                        </p>
                                    </div>
                                </div>

                                {/* Booking Information */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-extrabold text-primary">Booking Info</h3>
                                    <div className="mt-4">
                                        <p className="text-primary text-xl">
                                            <strong>Date:</strong> {date ? date : "date"}
                                        </p>
                                        <p className="text-primary text-xl">
                                            <strong>Time:</strong> {startTime ? startTime : "startTime"} - {endTime ? endTime : "endTime"}
                                        </p>
                                        <p className="text-primary text-xl">
                                            <strong>Payable Amount:</strong> ${payableAmount ? payableAmount : "payableAmount"}
                                        </p>
                                        <p className={`text-lg font-semibold mt-4 ${isBooked === "canceled" ? "text-red-500" : "text-green-500"}`}>
                                            <span className="text-primary font-bold"> Status:</span> {isBooked}
                                        </p>
                                        <p className="text-primary text-xl mt-2">
                                            Location: {facility?.location}
                                        </p>
                                        <p className="text-primary text-xl mt-2">
                                            Price per hour: ${facility?.pricePerHour}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <section className="">
                            <h4 className="text-xl font-extrabold text-gray-800">
                                {facility?.name}
                            </h4>
                            <p className="text-primary text-xl mt-2">
                                {facility?.description ? (
                                    <article className="prose lg:prose-xl">
                                        <div
                                            className="w-full"
                                            dangerouslySetInnerHTML={{ __html: facility?.description }}
                                        />
                                    </article>
                                ) : (
                                    <p>No content available for this blog.</p>
                                )}
                            </p>
                        </section>
                    </section>
                </section>


            </section>
        </section>
    );
};

export default MyBookingDetails;