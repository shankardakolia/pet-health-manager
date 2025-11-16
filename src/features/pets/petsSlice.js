// src/features/pets/petsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Fetch all pets
export const fetchPets = createAsyncThunk(
  "pets/fetchPets",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/pets");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// Fetch a single pet by ID
export const fetchPetDetails = createAsyncThunk(
  "pets/fetchPetDetails",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/pets/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const petsSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
    selectedPet: null,
    status: "idle",
    petDetailsStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // ---- FETCH PETS ----
      .addCase(fetchPets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ---- FETCH PET DETAILS ----
      .addCase(fetchPetDetails.pending, (state) => {
        state.petDetailsStatus = "loading";
        state.selectedPet = null;
      })
      .addCase(fetchPetDetails.fulfilled, (state, action) => {
        state.petDetailsStatus = "succeeded";
        state.selectedPet = action.payload;
      })
      .addCase(fetchPetDetails.rejected, (state, action) => {
        state.petDetailsStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default petsSlice.reducer;
