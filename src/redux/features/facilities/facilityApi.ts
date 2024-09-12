import { baseApi } from "@/redux/api/baseApi";


const facilityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createFacility: builder.mutation({
            query: (data) => ({
                url: "/facility",
                method: "POST",
                body: data
            })
        }),
        getAllFacilities: builder.query({
            query: () => ({
                url: "/facility",
                method: "GET"
            })
        }),
        getASingleFacility: builder.query({
            query: (facilityId) => ({
                url: `/facility/${facilityId}`,
                method: "GET",
            })
        }),
        deleteAFacility: builder.query({
            query: (facilityId) => ({
                url: `/facility/${facilityId}`,
                method: "DELETE",
            })
        })
    })
});


export const {
    useGetAllFacilitiesQuery,
    useCreateFacilityMutation,
    useGetASingleFacilityQuery,
    useDeleteAFacilityQuery
} = facilityApi;