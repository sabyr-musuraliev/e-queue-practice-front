import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "@shared/utils/axios-instance";
import { callStudents } from "@modules/CarInfo/model/carInfoSlice";
import { startPractice } from "@modules/CarInfo/model/carInfoSlice";
import { endPractice } from "@modules/CarInfo/model/carInfoSlice";

const initialState = {
  cars: [],
  activeCarId: null,
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
  async ({ departmentId, carNumber, carType }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await instance.post(`car/${departmentId}`, {
        carType,
        carNumber,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data.message);
    }
  },
);

export const removeCar = createAsyncThunk(
  "car/removeCar",
  async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const state = getState();
    const carId = state.cars.activeCarId;
    try {
      const response = await instance.delete(`car/${carId}`);

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
  reducers: {
    updateActiveCarId: (state, action) => {
      state.activeCarId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDepartmentsCars.pending, (state) => {
      state.loadingGet = true;
    });
    builder.addCase(getDepartmentsCars.fulfilled, (state, action) => {
      state.cars = action.payload.departmentCars;
      state.loadingGet = false;
    });
    builder.addCase(getDepartmentsCars.rejected, (state, action) => {
      state.loadingGet = false;
      state.message = action.payload;
    });
    builder.addCase(addNewCar.pending, (state) => {
      state.loadingPost = true;
    });
    builder.addCase(addNewCar.fulfilled, (state, action) => {
      state.cars.push(action.payload.newCar);
      state.loadingPost = false;
    });
    builder.addCase(addNewCar.rejected, (state, action) => {
      state.message = action.payload;
      state.loadingPost = false;
    });
    builder.addCase(removeCar.pending, (state) => {
      state.loadingPost = true;
    });
    builder.addCase(removeCar.fulfilled, (state, action) => {
      const carIdToRemove = action.payload.carId;
      state.cars = state.cars.filter((car) => car._id !== carIdToRemove);
      if (state.cars.length > 0) {
        state.activeCarId = state.cars[0]._id;
      } else {
        state.activeCarId = null;
      }
      state.loadingPost = false;
    });
    builder.addCase(removeCar.rejected, (state, action) => {
      state.message = action.payload;
      state.loadingPost = false;
    });
    builder.addCase(callStudents.fulfilled, (state, action) => {
      if (action.payload.noQueue) {
        return;
      }
      const updatedCar = action.payload.car;
      const carIndex = state.cars.findIndex(
        (car) => car._id === updatedCar._id,
      );
      if (carIndex !== -1) {
        state.cars[carIndex] = updatedCar;
      }
    });
    builder.addCase(startPractice.fulfilled, (state, action) => {
      const updatedCar = action.payload.car;
      const carIndex = state.cars.findIndex(
        (car) => car._id === updatedCar._id,
      );
      if (carIndex !== -1) {
        state.cars[carIndex] = updatedCar;
      }
    });
    builder.addCase(endPractice.fulfilled, (state, action) => {
      const updatedCar = action.payload.car;
      const carIndex = state.cars.findIndex(
        (car) => car._id === updatedCar._id,
      );
      if (carIndex !== -1) {
        state.cars[carIndex] = updatedCar;
      }
    });
  },
});

export const { updateActiveCarId } = carSlice.actions;

export default carSlice.reducer;
