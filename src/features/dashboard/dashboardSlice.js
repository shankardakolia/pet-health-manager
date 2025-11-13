import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchDashboardData = createAsyncThunk('dashboard/fetchDashboardData', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/dashboard/upcoming');
    // console.log('Dashboard API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    upcomingVaccinations: [],
    upcomingDewormings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        console.log('Dashboard data received:', action.payload);
        state.status = 'succeeded';
        state.upcomingVaccinations = action.payload.upcomingVaccinations || [];
        state.upcomingDewormings = action.payload.upcomingDewormings || [];
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch dashboard data';
      });
  },
});

export default dashboardSlice.reducer;
