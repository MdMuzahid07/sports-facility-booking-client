import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
    userId: string;
    userEmail: string;
    role: string;
    token: string;
}


type tAuthState = {
    user: null | TUser,
    userEmail: null | string;
    role: null | string;
    token: null | string;
}

const initialState: tAuthState = {
    user: null,
    userEmail: null,
    role: null,
    token: null
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, userEmail, role, token } = action.payload;
            state.user = user;
            state.userEmail = userEmail;
            state.role = role;
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.userEmail = null;
            state.role = null;
            state.token = null;
        }
    }
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;