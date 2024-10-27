import { baseApi } from "@/redux/api/baseApi";


const testimonialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTestimonial: builder.mutation({
            query: (data) => ({
                url: "/testimonial/add-testimonial",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["testimonials"]
        }),
        updateATestimonial: builder.mutation({
            query: ({ testimonialId, data }) => ({
                url: `/testimonial/${testimonialId}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["testimonials"]
        }),
        getAllTestimonials: builder.query({
            query: () => ({
                url: "/testimonial",
                method: "GET"
            }),
            providesTags: ["testimonials"]
        }),
        getASingleTestimonial: builder.query({
            query: (testimonialId) => ({
                url: `/testimonial/${testimonialId}`,
                method: "GET",
            }),
            providesTags: ["testimonials"]
        }),
        deleteATestimonial: builder.mutation({
            query: (testimonialId) => ({
                url: `/testimonial/${testimonialId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["testimonials"]
        })
    })
});


export const {
    useAddTestimonialMutation,
    useGetASingleTestimonialQuery,
    useGetAllTestimonialsQuery,
    useUpdateATestimonialMutation,
    useDeleteATestimonialMutation
} = testimonialApi;