import { useAppSelector } from "@/redux/hooks";
import { memo, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// using memoization (memo) to prevent unnecessary re-render when props not change

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email && !user?.role) {
            navigate("/login");
            toast.error("Please login!", { id: "protectedRoutesError" });
        }
    }, [user, navigate]);

    if (!user?.email && !user?.role) {
        return null;
    };

    return <>
        {children}
    </>;
};

export default memo(ProtectedRoutes);