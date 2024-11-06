/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyDashboard = () => {
    const bookings = [
        { facility: 'Gym', date: '2024-11-06', startTime: '10:00 AM', endTime: '11:00 AM', payableAmount: 20, isBooked: 'confirmed' },
        { facility: 'Pool', date: '2024-11-07', startTime: '1:00 PM', endTime: '2:00 PM', payableAmount: 30, isBooked: 'confirmed' },
        { facility: 'Pool', date: '2024-11-07', startTime: '1:00 PM', endTime: '2:00 PM', payableAmount: 30, isBooked: 'confirmed' },
        { facility: 'Pool', date: '2024-11-07', startTime: '1:00 PM', endTime: '2:00 PM', payableAmount: 30, isBooked: 'confirmed' },
        { facility: 'Pool', date: '2024-11-07', startTime: '1:00 PM', endTime: '2:00 PM', payableAmount: 30, isBooked: 'confirmed' },
        { facility: 'Pool', date: '2024-11-07', startTime: '1:00 PM', endTime: '2:00 PM', payableAmount: 30, isBooked: 'confirmed' },
        { facility: 'Gym', date: '2024-11-08', startTime: '11:00 AM', endTime: '12:00 PM', payableAmount: 25, isBooked: 'confirmed' },
        { facility: 'Gym', date: '2024-11-08', startTime: '11:00 AM', endTime: '12:00 PM', payableAmount: 25, isBooked: 'confirmed' },
        { facility: 'Gym', date: '2024-11-08', startTime: '11:00 AM', endTime: '12:00 PM', payableAmount: 25, isBooked: 'confirmed' },
        { facility: 'Gym', date: '2024-11-08', startTime: '11:00 AM', endTime: '12:00 PM', payableAmount: 25, isBooked: 'confirmed' },
        { facility: 'Gym', date: '2024-11-08', startTime: '11:00 AM', endTime: '12:00 PM', payableAmount: 25, isBooked: 'confirmed' },
        { facility: 'Gym', date: '2024-11-08', startTime: '11:00 AM', endTime: '12:00 PM', payableAmount: 25, isBooked: 'confirmed' },
        { facility: 'Gym', date: '2024-11-08', startTime: '11:00 AM', endTime: '12:00 PM', payableAmount: 25, isBooked: 'confirmed' },
        { facility: 'Gym', date: '2024-11-08', startTime: '11:00 AM', endTime: '12:00 PM', payableAmount: 25, isBooked: 'confirmed' },
        { facility: 'Gym', date: '2024-11-08', startTime: '11:00 AM', endTime: '12:00 PM', payableAmount: 25, isBooked: 'confirmed' },
        { facility: 'Gym', date: '2024-11-08', startTime: '11:00 AM', endTime: '12:00 PM', payableAmount: 25, isBooked: 'confirmed' },
        { facility: 'Gym', date: '2024-11-08', startTime: '11:00 AM', endTime: '12:00 PM', payableAmount: 25, isBooked: 'confirmed' },
        // Additional bookings...
    ];
    const orders = [
        { cartId: '12345', paymentMethod: 'Stripe', paymentStatus: 'Paid', orderStatus: 'Completed', customerDetails: { name: 'John Doe' } },
        { cartId: '67890', paymentMethod: 'COD', paymentStatus: 'Pending', orderStatus: 'Processing', customerDetails: { name: 'Jane Smith' } },
        // Additional orders...
    ];
    const testimonials = [
        { name: 'Jane Doe', occupation: 'Software Developer', testimonialText: 'Great service!', image: '/path/to/image.jpg', publish: true },
        { name: 'John Smith', occupation: 'Graphic Designer', testimonialText: 'Amazing experience!', image: '/path/to/image.jpg', publish: true },
        // Additional testimonials...
    ];

    // Calculate total payable amounts by facility
    const bookingData = bookings.reduce((acc: any, booking: any) => {
        const existing = acc.find((item: any) => item.facility === booking.facility);
        if (existing) {
            existing.totalAmount += booking.payableAmount;
        } else {
            acc.push({ facility: (booking).facility, totalAmount: booking.payableAmount });
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
                            {bookings.map((booking, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{booking.facility}</td>
                                    <td className="px-4 py-2">{booking.date}</td>
                                    <td className="px-4 py-2">{booking.startTime} - {booking.endTime}</td>
                                    <td className="px-4 py-2">${booking.payableAmount}</td>
                                    <td className={`px-4 py-2 ${booking.isBooked === 'confirmed' ? 'text-green-600' : 'text-red-600'}`}>
                                        {booking.isBooked}
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
                            {orders.map((order, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{order.cartId}</td>
                                    <td className="px-4 py-2">{order.customerDetails.name}</td>
                                    <td className="px-4 py-2">{order.paymentMethod}</td>
                                    <td className={`px-4 py-2 ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {order.paymentStatus}
                                    </td>
                                    <td className={`px-4 py-2 ${order.orderStatus === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {order.orderStatus}
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
                            {testimonials.map((testimonial, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">
                                        <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                                    </td>
                                    <td className="px-4 py-2">{testimonial.name}</td>
                                    <td className="px-4 py-2">{testimonial.occupation}</td>
                                    <td className="px-4 py-2">{testimonial.testimonialText}</td>
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
