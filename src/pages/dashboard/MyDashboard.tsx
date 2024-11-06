/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllBookingsUserQuery } from '@/redux/features/bookings/bookingsApi';
import { useGetAllOrderQuery } from '@/redux/features/order/orderApi';
import { useGetAllTestimonialsQuery } from '@/redux/features/testimonial/testimonialApi';
import { useAppSelector } from '@/redux/hooks';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyDashboard = () => {
    const { data: myBookings } = useGetAllBookingsUserQuery(undefined);
    const { data: myOrders } = useGetAllOrderQuery(undefined);
    const { data: myTestimonial } = useGetAllTestimonialsQuery(undefined);
    const user = useAppSelector((state) => state.auth.user);
    console.log(user)

    const bookings = myBookings?.data;

    const orders = myOrders?.data;

    const testimonials = myTestimonial?.data?.filter((testimonial: any) => testimonial?.email === user?.email);

    // Calculate total payable amounts by facility
    const bookingData = bookings?.reduce((acc: any, booking: any) => {
        const existing = acc?.find((item: any) => item?.facility === booking?.facility?.name);
        if (existing) {
            existing.totalAmount += booking.payableAmount;
        } else {
            acc.push({ facility: booking.facility.name, totalAmount: booking.payableAmount });
        }
        return acc;
    }, []);



    return (
        <div className="py-10">
            <h3 className="text-3xl font-extrabold mb-10 mt-10">My Dashboard</h3>

            {/* ============================ Bookings Chart ==================================> */}
            <div className="mb-10">
                <h4 className="text-2xl font-semibold mb-4">Booking Amounts by Facility</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={bookingData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="facility" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalAmount" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* ========================== Bookings Table ===================================> */}
            <div className="mb-10">
                <h4 className="text-2xl font-semibold mb-4">My Bookings</h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-xl">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Facility</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Time</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings?.map((booking: any) => (
                                <tr key={booking?._id} className="border-t">
                                    <td className="px-4 py-2">{booking?.facility?.name}</td>
                                    <td className="px-4 py-2">{booking?.date}</td>
                                    <td className="px-4 py-2">{booking?.startTime} - {booking?.endTime}</td>
                                    <td className="px-4 py-2">${booking?.payableAmount}</td>
                                    <td className={`px-4 py-2 ${booking?.isBooked === 'confirmed' ? 'text-green-600' : 'text-red-600'}`}>
                                        {booking?.isBooked}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ========================Orders Table==================================> */}
            <div className="mb-10">
                <h4 className="text-2xl font-semibold mb-4">My Orders</h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Order ID</th>
                                <th className="px-4 py-2">Customer</th>
                                <th className="px-4 py-2">Payment Method</th>
                                <th className="px-4 py-2">Payment Status</th>
                                <th className="px-4 py-2">Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order: any,) => (
                                <tr key={order?._id} className="border-t">
                                    <td className="px-4 py-2">{order?.cartId}</td>
                                    <td className="px-4 py-2">{order?.customerDetails.name}</td>
                                    <td className="px-4 py-2">{order?.paymentMethod}</td>
                                    <td className={`px-4 py-2 ${order?.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {order?.paymentStatus}
                                    </td>
                                    <td className={`px-4 py-2 ${order?.orderStatus === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {order?.orderStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Testimonials Table */}
            <div className="mb-10">
                <h4 className="text-2xl font-semibold mb-4">My Testimonials</h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-xl">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Occupation</th>
                                <th className="px-4 py-2">Testimonial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials?.map((testimonial: any) => (
                                <tr key={testimonial?._id} className="border-t">
                                    <td className="px-4 py-2">
                                        <img src={testimonial.image} alt={testimonial?.name} className="w-10 h-10 rounded-full" />
                                    </td>
                                    <td className="px-4 py-2">{testimonial?.name}</td>
                                    <td className="px-4 py-2">{testimonial?.occupation}</td>
                                    <td className="px-4 py-2">{testimonial?.testimonialText}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyDashboard;