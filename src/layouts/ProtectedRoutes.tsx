import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
    const user = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || (!user.userEmail && !user.role)) {
            toast.error("Please login!", { id: "unauthorizedDetected" });
            navigate("/login");
        }
    }, [user, navigate]);


    if (user && user.userEmail && user.role) {
        return <>
            {children}
        </>;
    };

    return null;
};

export default ProtectedRoutes;