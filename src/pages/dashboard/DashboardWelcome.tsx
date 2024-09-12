import { useAppSelector } from "@/redux/hooks";

const DashboardWelcome = () => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div className="py-10">
            <div className="bg-white w-full min-h-[450px] p-8 rounded-lg">
                <h1 className="gap-8 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                    <span className="bg-black text-white px-4 pb-1">Hey</span> {user?.email.split("@")[0]}
                </h1>
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-extrabold mb-10 mt-10">Welcome back to PlayTime Pro</h3>
            </div>
        </div>
    )
};

export default DashboardWelcome;