import { baseApi } from "@/redux/api/baseApi";


const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: "/product/create-product",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["products"]
        }),
        updateAProduct: builder.mutation({
            query: ({ productId, data }) => ({
                url: `/product/${productId}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["products"]
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: "/product",
                method: "GET"
            }),
            providesTags: ["products"]
        }),
        getASingleProduct: builder.query({
            query: (productId) => ({
                url: `/product/${productId}`,
                method: "GET",
            }),
            providesTags: ["products"]
        }),
        deleteAProduct: builder.mutation({
            query: (productId) => ({
                url: `/product/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products"]
        })
    })
});


export const {
    useCreateProductMutation,
    useGetASingleProductQuery,
    useGetAllProductsQuery,
    useUpdateAProductMutation,
    useDeleteAProductMutation
} = productApi;