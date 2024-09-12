import { baseApi } from "@/redux/api/baseApi";


const facilityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createFacility: builder.mutation({
            query: (data) => ({
                url: "/facility",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["facility"]
        }),
        getAllFacilities: builder.query({
            query: () => ({
                url: "/facility",
                method: "GET"
            }),
            providesTags: ["facility"]
        }),
        getASingleFacility: builder.query({
            query: (facilityId) => ({
                url: `/facility/${facilityId}`,
                method: "GET",
            }),
            providesTags: ["facility"]
        }),
        deleteAFacility: builder.mutation({
            query: (facilityId) => ({
                url: `/facility/${facilityId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["facility"]
        })
    })
});


export const {
    useGetAllFacilitiesQuery,
    useCreateFacilityMutation,
    useGetASingleFacilityQuery,
    useDeleteAFacilityMutation
} = facilityApi;