import { baseApi } from "@/redux/api/baseApi";


const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getUserById: builder.query({
            query: ({ userId }) => ({
                url: `/auth/user/${userId}`,
                method: "GET"
            }),
            providesTags: ["userInfo"]
        }),

        updateUserInfo: builder.mutation({
            query: ({ userId, data }) => ({
                url: `/auth/profile-update/${userId}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["userInfo"]
        })
    })
});


export const {
    useUpdateUserInfoMutation
} = profileApi;