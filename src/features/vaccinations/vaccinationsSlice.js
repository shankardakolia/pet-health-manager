import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchVaccinations = createAsyncThunk('vaccinations/fetchVaccinations', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/vaccinations');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const vaccinationsSlice = createSlice({
  name: 'vaccinations',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchVaccinations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVaccinations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchVaccinations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default vaccinationsSlice.reducer;
