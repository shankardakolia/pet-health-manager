import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchDewormings = createAsyncThunk('dewormings/fetchDewormings', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/dewormings');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const dewormingsSlice = createSlice({
  name: 'dewormings',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDewormings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDewormings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchDewormings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default dewormingsSlice.reducer;
