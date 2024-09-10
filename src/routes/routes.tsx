import App from "@/App";
import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import MainLayout from "@/layouts/main/MainLayout";
import ProtectedRoutes from "@/layouts/ProtectedRoutes";
import AddAdmin from "@/pages/dashboard/AddAdmin";
import ManageBookings from "@/pages/dashboard/bookings/ManageBookings";
import DashboardWelcome from "@/pages/dashboard/DashboardWelcome";
import AddFacility from "@/pages/dashboard/facilities/AddFacility";
import ManageFacilities from "@/pages/dashboard/facilities/ManageFacilities";
import MyBookings from "@/pages/dashboard/MyBookings";
import AboutUs from "@/pages/main/AboutUs";
import ContactUs from "@/pages/main/ContactUs";
import Facilities from "@/pages/main/Facilities";
import FacilityBooking from "@/pages/main/FacilityBooking";
import FacilityDetails from "@/pages/main/FacilityDetails";
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
            {
                path: "/facility-details/:facilityId",
                element: <FacilityDetails />
            },
            {
                path: "/facility-booking/:bookById",
                element: <FacilityBooking />
            }
        ]
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoutes>
                <DashboardLayout />
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "home",
                element: <DashboardWelcome />
            },
            {
                path: "add-admin",
                element: <AddAdmin />
            },
            {
                path: "my-bookings",
                element: <MyBookings />
            },
            {
                path: "manage-bookings",
                element: <ManageBookings />
            },
            {
                path: "add-facilities",
                element: <AddFacility />
            },
            {
                path: "manage-facilities",
                element: <ManageFacilities />
            },
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