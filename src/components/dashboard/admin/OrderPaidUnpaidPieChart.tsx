/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useGetAllOrderQuery } from "@/redux/features/order/orderApi";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

// Define the order type
interface Order {
    paymentMethod: string;
    [key: string]: any; // Extendable for other order properties
}

const OrderPaidUnpaidPieChart: React.FC = () => {
    const { data: allOrders } = useGetAllOrderQuery(undefined);

    // Count the number of paid and COD orders
    const orderStats = allOrders?.data?.reduce(
        (acc: { paid: number; cod: number }, order: Order) => {
            if (order?.paymentMethod === "COD") {
                acc.cod += 1;
            } else {
                acc.paid += 1;
            }
            return acc;
        },
        { paid: 0, cod: 0 }
    );

    // Data for the PieChart
    const chartData = [
        { name: "Paid Orders", value: orderStats?.paid },
        { name: "COD Orders", value: orderStats?.cod },
    ];

    // Colors for the chart
    const COLORS = ["#0088FE", "#FF8042"];

    return (
        <section className="bg-slate-100 rounded-2xl drop-shadow-sm p-6" >
            <h2 className="text-lg font-semibold mb-2">Store : Sports Equipments Payment</h2>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        label
                    >
                        {chartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </section>
    );
};

export default OrderPaidUnpaidPieChart;
