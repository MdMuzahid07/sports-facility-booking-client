import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllCart: builder.query({
            query: () => ({
                url: "/cart",
                method: "GET"
            }),
        }),

        getASingleCart: builder.query({
            query: (id) => ({
                url: `/cart/${id}`,
                method: "GET"
            }),
        }),

        addCart: builder.mutation({
            query: (data) => ({
                url: "/cart/add-cart",
                method: "POST",
                body: data
            }),
        }),

        deleteACart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: "DELETE"
            }),
        }),

        updateACart: builder.mutation({
            query: ({ id, data }) => ({
                url: `/cart/${id}`,
                method: "PATCH",
                body: data
            }),
        }),

    })
});


export const {
    useGetAllCartQuery,
    useGetASingleCartQuery,
    useUpdateACartMutation,
    useAddCartMutation,
    useDeleteACartMutation
} = cartApi;