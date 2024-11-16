import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllOrder: builder.query({
            query: () => ({
                url: "/orders",
                method: "GET"
            }),
            providesTags: ["orders"]
        }),

        getASingleOrder: builder.query({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "GET"
            }),
            providesTags: ["orders"]
        }),

        addOrder: builder.mutation({
            query: (data) => ({
                url: "/orders/add-order",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["orders"]
        }),

        deleteAOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["orders"]
        }),

        updateAOrder: builder.mutation({
            query: ({ id, data }) => ({
                url: `/orders/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["orders"]
        }),

        // this will work for COD - Cash On Delivery ,method update purpose only
        updatePaymentMethod: builder.mutation({
            query: ({ id }) => ({
                url: `/orders/payment-method/${id}`,
                method: "PATCH",
                data: {}
            }),
            invalidatesTags: ["orders"]
        }),

    })
});


export const {
    useGetASingleOrderQuery,
    useGetAllOrderQuery,
    useAddOrderMutation,
    useDeleteAOrderMutation,
    useUpdateAOrderMutation,
    useUpdatePaymentMethodMutation
} = orderApi;