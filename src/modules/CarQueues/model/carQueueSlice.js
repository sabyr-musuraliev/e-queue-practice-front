import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "@shared/utils/axios-instance";

const initialState = {
  carsQueues: [],
  loading: false,
  message: "",
};

export const getDepartmentsQueues = createAsyncThunk(
  "carQueues/getDepartmentsQueues",
  async (departmentId, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await instance.get(`queues/${departmentId}/spec`);

      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data.message);
    }
  },
);

export const carQueues = createSlice({
  name: "carQueues",
  initialState,
  reducers: {
    updateQueue: (state, action) => {
      console.log(action.payload);
      state.carsQueues = state.carsQueues.filter(
        (item) => item.number !== action.payload.number,
      );
      state.carsQueues.unshift(action.payload);
      state.carsQueues.sort((a, b) => {
        if (a.status === "calling" && b.status !== "calling") {
          return -1;
        }
        if (a.status !== "calling" && b.status === "calling") {
          return 1;
        }
        return 0;
      });
    },
    removeQueue: (state, action) => {
      console.log(action);
      state.carsQueues = state.carsQueues.filter(
        (item) => item.number !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDepartmentsQueues.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDepartmentsQueues.fulfilled, (state, action) => {
      state.carsQueues = action.payload;
      state.loading = false;
    });
    builder.addCase(getDepartmentsQueues.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
  },
});

export const { updateQueue, removeQueue } = carQueues.actions;

export default carQueues.reducer;
