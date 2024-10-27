import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllCart: builder.query({
            query: () => ({
                url: "/cart",
                method: "GET"
            }),
            providesTags: ["Review"]
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
            invalidatesTags: ["Review"]
        }),

        deleteACart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Review"]
        }),

        updateACart: builder.mutation({
            query: ({ id, data }) => ({
                url: `/cart/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Review"]
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