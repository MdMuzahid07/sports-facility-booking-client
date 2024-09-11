import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
    email: string;
    password: string;
    role: string;
    id: string;
    iat: number;
    exp: number;
}


type tAuthState = {
    user: null | TUser,
    token: null | string;
}

const initialState: tAuthState = {
    user: null,
    token: null
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;