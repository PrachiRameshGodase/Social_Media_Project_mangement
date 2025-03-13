import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Config/axiosInstance";
import toast from "react-hot-toast";




// Async thunk to fetch users list
export const fetchDashboard = createAsyncThunk(
    "dasboard/fetchList",
    async (filters = {}, { rejectWithValue }) => {
        try {

            const response = await axiosInstance.post(`/dashboard`, filters);

            return response.data;
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        list: [],
        userDetails: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearUserDetails: (state) => {
            state.userDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder

        // Fetch dashboard List
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })




    },
});

export const { clearUserDetails } = dashboardSlice.actions;
export default dashboardSlice.reducer;
