import AdminDashboard from "@/components/dashboard/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { useAppSelector } from "@/redux/hooks";


const MyDashboard = () => {
    const user = useAppSelector((state) => state.auth.user);


    return (
        <section className="py-10">
            <h3 className="text-3xl font-extrabold mb-10 mt-10">My Dashboard</h3>
            {
                user && user?.role === "user" ? (<UserDashboard />) : (<AdminDashboard />)
            }
        </section>
    );
};

export default MyDashboard;
