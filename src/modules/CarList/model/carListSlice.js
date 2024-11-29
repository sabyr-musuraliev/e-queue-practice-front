import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "@shared/utils/axios-instance";

const initialState = {
  cars: [],
  loadingGet: false,
  loadingPost: false,
  message: "",
};

export const getDepartmentsCars = createAsyncThunk(
  "car/getDepartmentsCars",
  async (departmentId, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await instance.get(`car/${departmentId}`);

      if (response.status === 204) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data.message);
    }
  },
);

export const addNewCar = createAsyncThunk(
  "car/addNewCar",
  async (departmentId, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await instance.post(`car/${departmentId}`);

      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data.message);
    }
  },
);

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartmentsCars.pending, (state) => {
      state.loadingGet = true;
    });
    builder.addCase(getDepartmentsCars.fulfilled, (state, action) => {
      state.cars = action.payload.departmentCars;
      state.loadingGet = false;
    });
    builder.addCase(getDepartmentsCars.fulfilled, (state, action) => {
      state.loadingGet = false;
      state.message = action.payload;
    });
    builder.addCase(addNewCar.pending, (state) => {
      state.loadingPost = true;
    });
    builder.addCase(addNewCar.fulfilled, (state, action) => {
      state.cars = action.payload.newCar;
      state.loadingPost = false;
    });
    builder.addCase(addNewCar.fulfilled, (state, action) => {
      state.message = action.payload;
      state.loading = false;
    });
  },
});

export default carSlice.reducer;
