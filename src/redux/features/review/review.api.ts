import { baseApi } from "@/redux/api/baseApi";


const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addReview: builder.mutation({
            query: (data) => ({
                url: "/review/add-review",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["reviews"]
        }),
        getAllReview: builder.query({
            query: () => ({
                url: "/review",
                method: "GET"
            }),
            providesTags: ["reviews"]
        }),
        getReviewByUserId: builder.query({
            query: (reviewId) => ({
                url: `/review/${reviewId}`,
                method: "GET",
            }),
            providesTags: ["reviews"]
        }),
        deleteAReview: builder.mutation({
            query: (reviewId) => ({
                url: `/review/${reviewId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["reviews"]
        })
    })
});


export const {
    useAddReviewMutation,
    useGetAllReviewQuery,
    useGetReviewByUserIdQuery,
    useDeleteAReviewMutation
} = reviewApi;