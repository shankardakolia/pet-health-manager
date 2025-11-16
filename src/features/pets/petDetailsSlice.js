import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchPetDetails = createAsyncThunk(
  "petDetails/fetchPetDetails",
  async (petId, thunkAPI) => {
    try {
      const details = await axiosInstance.get(`/pets/${petId}/details`);
      return {
        pet: details.data.pet,
        vaccinations: details.data.vaccinations || [],
        dewormings: details.data.dewormings || [],
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);


const petDetailsSlice = createSlice({
  name: "petDetails",
  initialState: {
    pet: null,
    vaccinations: [],
    dewormings: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPetDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPetDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pet = action.payload.pet;
        state.vaccinations = action.payload.vaccinations;
        state.dewormings = action.payload.dewormings;
      })
      .addCase(fetchPetDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default petDetailsSlice.reducer;
