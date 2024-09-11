import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
    // extra added with fetchBaseQuery
    // in prepareHeaders we get two parameters (header,api), we get the getState() from the api
    prepareHeaders: (headers, { getState }) => {
        // getting the token from the redux state
        const token = (getState() as RootState).auth.token;

        // if token find we are setting it to header, by headers.set() , in this method we have to pass
        // two arguments, one is "authorization", second is token, if backend receiving bearer then with bearer
        // otherwise just token
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    }
});


// when our access token invalidate we are getting an error,
// we need to renew our access token by using refresh token
// to do this we can make an custom base query by following redux documentation (Implementing a custom baseQuery);
// we have to take tree arguments(args, api, and extraOptions) to create custom base query 


// const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
//     // we can call our baseQuery here with this three arguments received in custom base query
//     const result = baseQuery(args, api, extraOptions);
//     console.log(result)
// };



export const baseApi = createApi({
    reducerPath: "baseApi",
    // baseQuery: fetchBaseQuery({
    //     baseUrl: "http://localhost:5000/api/",
    //     credentials: "include"
    // }),
    // cleaner syntax => just storing in a variable and using here 
    // we calling baseQuery in our custom base query, thats why it will call from there
    // because we called our baseQuery in our custom base query thats why we need to set here the custom one
    baseQuery: baseQuery,
    endpoints: () => ({})
});