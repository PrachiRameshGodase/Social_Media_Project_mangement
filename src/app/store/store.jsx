import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import userReducer from "./userSlice";
import projectReducer from "./projectSlice"
import dashboardReducer from "./dashboardSlice"

export const store=configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        project: projectReducer,
        dashboard: dashboardReducer
    }
})