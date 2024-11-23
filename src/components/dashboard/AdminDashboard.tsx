import BookingPaidUnpaidPieChart from "./admin/BookingPaidUnpaidPieChart";
import DashCards from "./admin/DashCards";
import OrderPaidUnpaidPieChart from "./admin/OrderPaidUnpaidPieChart";

const AdminDashboard = () => {
    return (
        <section className="space-y-8 bg-white rounded-lg px-4 md:px-8 py-6 md:py-10">
            <DashCards />
            <section className="grid lg:grid-cols-2 gap-8">
                <OrderPaidUnpaidPieChart />
                <BookingPaidUnpaidPieChart />
            </section>
        </section>
    )
}

export default AdminDashboard;