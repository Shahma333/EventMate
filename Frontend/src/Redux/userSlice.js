import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("access_token") || null,
    role: localStorage.getItem("role") || null,  // Ensure role is read from localStorage
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.role = user.role || action.payload.role; // Ensure the role is properly set here

            // Store in localStorage
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("access_token", token);
            localStorage.setItem("role", user.role || action.payload.role);  // Save role to localStorage
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;

            // Remove from localStorage on logout
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            localStorage.removeItem("role");
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem("user", JSON.stringify(state.user));
        }
    },
});

export const { setUser, logout, updateUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
