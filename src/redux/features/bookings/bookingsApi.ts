import { baseApi } from "@/redux/api/baseApi";


const bookingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (data) => ({
                url: "/bookings",
                method: "POST",
                body: data
            })
        }),
        getAllBookingsUser: builder.query({
            query: () => ({
                url: "/bookings/user",
                method: "GET"
            })
        }),
        getAllBookingsAdmin: builder.query({
            query: () => ({
                url: "/bookings",
                method: "GET",
            })
        })
    })
});


export const {
    useGetAllBookingsAdminQuery,
    useGetAllBookingsUserQuery,
    useCreateBookingMutation
} = bookingsApi;