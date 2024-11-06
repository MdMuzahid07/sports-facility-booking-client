import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllOrder: builder.query({
            query: () => ({
                url: "/orders",
                method: "GET"
            }),
        }),

        getASingleOrder: builder.query({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "GET"
            }),
        }),

        addOrder: builder.mutation({
            query: (data) => ({
                url: "/orders/add-order",
                method: "POST",
                body: data
            }),
        }),

        deleteAOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "DELETE"
            }),
        }),

        updateAOrder: builder.mutation({
            query: ({ id, data }) => ({
                url: `/orders/${id}`,
                method: "PATCH",
                body: data
            }),
        }),

    })
});


export const {
    useGetASingleOrderQuery,
    useGetAllOrderQuery,
    useAddOrderMutation,
    useDeleteAOrderMutation,
    useUpdateAOrderMutation
} = orderApi;