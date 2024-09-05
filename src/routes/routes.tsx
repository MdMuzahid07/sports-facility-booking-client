import App from "@/App";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import MainLayout from "@/layouts/main/MainLayout";
import {
    createBrowserRouter,

} from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "?",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <App />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [

        ]
    }
]);


export default routes;