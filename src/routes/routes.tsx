import App from "@/App";
import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import MainLayout from "@/layouts/main/MainLayout";
import AboutUs from "@/pages/main/AboutUs";
import ContactUs from "@/pages/main/ContactUs";
import Facilities from "@/pages/main/Facilities";
import PageNotFound from "@/pages/PageNotFound";
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
            {
                path: "/about-us",
                element: <AboutUs />
            },
            {
                path: "/contact-us",
                element: <ContactUs />
            },
            {
                path: "/facilities",
                element: <Facilities />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [

        ]
    },
    {
        path: "*",
        element: <PageNotFound />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    },
]);


export default routes;