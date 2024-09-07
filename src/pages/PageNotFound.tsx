import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
    };

    return (
        <div className="bg-[#171717] w-screen h-screen text-white flex items-center justify-center">
            <div>
                <h1 className="text-3xl font-extrabold">Page Not Found</h1>
                <div className="flex justify-center mt-14">
                    <Button onClick={handleNavigate} className="w-12 h-12 rounded-full border-2 p-1"><House /></Button>
                </div>
            </div>
        </div>
    )
};

export default PageNotFound;