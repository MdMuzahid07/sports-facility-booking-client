import { baseApi } from "@/redux/api/baseApi";


const bookingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (data) => ({
                url: "/bookings",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["bookings"]
        }),
        getAllBookingsUser: builder.query({
            query: () => ({
                url: "/bookings/user",
                method: "GET"
            }),
            providesTags: ["bookings"]
        }),
        getASingleBookingsUser: builder.query({
            query: (id) => ({
                url: `/bookings/user/${id}`,
                method: "GET"
            }),
            providesTags: ["bookings"]
        }),
        getAllBookingsAdmin: builder.query({
            query: () => ({
                url: "/bookings",
                method: "GET",
            }),
            providesTags: ["bookings"]
        }),
        checkAvailability: builder.query({
            query: ({ date, id }) => ({
                url: `/check-availability?date=${date}&facility=${id}`,
                method: "GET",
            }),
            providesTags: ["bookings"]
        }),
        cancelBooking: builder.mutation({
            query: (id) => ({
                url: `/bookings/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["bookings"]
        }),
    })
});


export const {
    useGetAllBookingsAdminQuery,
    useGetAllBookingsUserQuery,
    useCreateBookingMutation,
    useCheckAvailabilityQuery,
    useCancelBookingMutation,
    useGetASingleBookingsUserQuery
} = bookingsApi;