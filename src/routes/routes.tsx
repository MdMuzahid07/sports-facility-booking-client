import App from "@/App";
import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";
import ProductDetails from "@/components/main/shop/ProductDetails";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import MainLayout from "@/layouts/main/MainLayout";
import ProtectedRoutes from "@/layouts/ProtectedRoutes";
import AddAdmin from "@/pages/dashboard/AddAdmin";
import ManageBookings from "@/pages/dashboard/bookings/ManageBookings";
import AddFacility from "@/pages/dashboard/facilities/AddFacility";
import ManageFacilities from "@/pages/dashboard/facilities/ManageFacilities";
import UpdateFacility from "@/pages/dashboard/facilities/UpdateFacility";
import MyBookingDetails from "@/pages/dashboard/MyBookingDetails";
import MyBookings from "@/pages/dashboard/MyBookings";
import MyProfile from "@/pages/dashboard/MyProfile";
import MyTestimonial from "@/pages/dashboard/MyTestimonial";
import AddProduct from "@/pages/dashboard/products/AddProduct";
import CartPage from "@/pages/dashboard/products/CartPage";
import ManageOrders from "@/pages/dashboard/products/ManageOrders";
import ManageProducts from "@/pages/dashboard/products/ManageProducts";
import MyOrders from "@/pages/dashboard/products/MyOrders";
import UpdateProduct from "@/pages/dashboard/products/UpdateProduct";
import AboutUs from "@/pages/main/AboutUs";
import ContactUs from "@/pages/main/ContactUs";
import Facilities from "@/pages/main/Facilities";
import FacilityBooking from "@/pages/main/FacilityBooking";
import FacilityDetails from "@/pages/main/FacilityDetails";
import SportsEquipments from "@/pages/main/SportsEquipments";
import PageNotFound from "@/pages/PageNotFound";
import {
    createBrowserRouter,
} from "react-router-dom";
import MyDashboard from "@/pages/dashboard/MyDashboard";
import ShippingAddressFrom from "@/pages/main/ShippingAddressFrom";
import Payment from "@/pages/main/Payment";
import MyReviews from "@/pages/dashboard/reviews/MyReviews";
import CancelledOrders from "@/pages/dashboard/cancelled-orders/CancelledOrders";
import CancelledBookings from "@/pages/dashboard/cancelled-bookings/CancelledBookings";
import CancelledBookingsUser from "@/pages/dashboard/cancelled-bookings/CancelledBookingsUser";
import MyTransaction from "@/pages/dashboard/transaction/MyTransaction";
import AllTransaction from "@/pages/dashboard/transaction/AllTransaction";

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
                path: "/store",
                element: <SportsEquipments />
            },
            {
                path: "/checkout-cart",
                element: (
                    <ProtectedRoutes>
                        <CartPage />
                    </ProtectedRoutes>
                )
            },
            {
                path: "/shipping-address/:cartId",
                element: <ShippingAddressFrom />
            },
            {
                path: "/payment/:orderId",
                element: <Payment />
            },
            {
                path: "/facility-details/:facilityId",
                element: <FacilityDetails />
            },
            {
                path: "/product-details/:productId",
                element: <ProductDetails />
            },
            {
                path: "/facility-booking/:bookById",
                element: (
                    <ProtectedRoutes>
                        <FacilityBooking />
                    </ProtectedRoutes>
                )
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
                element: <MyDashboard />
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
                path: "my-transaction",
                element: <MyTransaction />
            },
            {
                path: "all-transaction",
                element: <AllTransaction />
            },
            {
                path: "my-booking-details/:myBookingId",
                element: <MyBookingDetails />
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
                path: "manage-products",
                element: <ManageProducts />
            },
            {
                path: "manage-orders",
                element: <ManageOrders />
            },
            {
                path: "my-profile",
                element: <MyProfile />
            },
            {
                path: "my-orders",
                element: <MyOrders />
            },
            {
                path: "cancelled-orders",
                element: <CancelledOrders />
            },
            {
                path: "cancelled-bookings",
                element: <CancelledBookings />
            },
            {
                path: "cancelled-bookings-user",
                element: <CancelledBookingsUser />
            },
            {
                path: "my-testimonial",
                element: <MyTestimonial />
            },
            {
                path: "my-reviews",
                element: <MyReviews />
            },
            {
                path: "add-products",
                element: <AddProduct />
            },
            {
                path: "update-facility/:facilityId",
                element: <UpdateFacility />
            },
            {
                path: "update-product/:productId",
                element: <UpdateProduct />
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