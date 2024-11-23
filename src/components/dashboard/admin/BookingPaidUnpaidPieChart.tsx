/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllBookingsAdminQuery } from "@/redux/features/bookings/bookingsApi";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

// Define the booking type
interface Booking {
    paymentMethod: string;
    [key: string]: any; // Extendable for other booking properties
}

const BookingPaidUnpaidPieChart = () => {
    const { data: allBooking } = useGetAllBookingsAdminQuery(undefined);

    // Count the number of paid and unpaid bookings
    const bookingStats = allBooking?.data?.reduce(
        (acc: { paid: number; unpaid: number }, booking: Booking) => {
            if (booking?.paymentMethod === "Unpaid") {
                acc.unpaid += 1;
            } else {
                acc.paid += 1;
            }
            return acc;
        },
        { paid: 0, unpaid: 0 }
    );

    console.log(bookingStats)

    // Data for the PieChart
    const chartData = [
        { name: "Paid Bookings", value: bookingStats?.paid },
        { name: "Unpaid Bookings", value: bookingStats?.unpaid },
    ];

    // Colors for the chart
    const COLORS = ["#34D399", "#EF4444"]; // Green for Paid, Red for Unpaid

    return (
        <section className="bg-slate-100 rounded-xl shadow-xl p-6">
            <h2 className="text-lg font-semibold mb-2">Sports Facility : Bookings Payment</h2>
            <div>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart >
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default BookingPaidUnpaidPieChart;
