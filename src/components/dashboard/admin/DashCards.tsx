import { useGetAllFacilitiesQuery } from "@/redux/features/facilities/facilityApi"
import DashboardDashCard from "./DashboardDashCard"
import { useGetAllBookingsAdminQuery } from "@/redux/features/bookings/bookingsApi";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { useGetAllOrderQuery } from "@/redux/features/order/orderApi";

const DashCards = () => {
    const { data: allFacility } = useGetAllFacilitiesQuery(undefined);
    const { data: allBooking } = useGetAllBookingsAdminQuery(undefined);
    const { data: allProducts } = useGetAllProductsQuery(undefined);
    const { data: allOrders } = useGetAllOrderQuery(undefined);


    const data = [
        {
            title: "Facilities",
            length: allFacility?.data?.length,
            _id: "h9876asdf"
        },
        {
            title: "Bookings",
            length: allBooking?.data?.length,
            _id: "h9ds876asdf"

        },
        {
            title: "Products",
            length: allProducts?.data?.length,
            _id: "hqr9876asdf"

        },
        {
            title: "Orders",
            length: allOrders?.data?.length,
            _id: "h987ads6asdf"
        },
    ]



    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {
                data?.map((cardInfo) => <DashboardDashCard key={cardInfo?._id} cardInfo={cardInfo} />)
            }
        </div>
    )
}

export default DashCards