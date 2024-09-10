import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
    userId: string;
    userEmail: string;
    role: string;
}


type tAuthState = {
    user: null | TUser,
    userEmail: null | string;
    role: null | string;
}

const initialState: tAuthState = {
    user: null,
    userEmail: null,
    role: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, userEmail, role } = action.payload;
            state.user = user;
            state.userEmail = userEmail;
            state.role = role;
        },
        logout: (state) => {
            state.user = null;
            state.userEmail = null;
            state.role = null;
        }
    }
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;