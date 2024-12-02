import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "@shared/utils/axios-instance";

const initialState = {
  car: {},
  queues: [],
  loadingGet: false,
  loadingPost: false,
  message: "",
};

export const getCarsQueues = createAsyncThunk(
  "queue/getCarsQueues",
  async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;

    const state = getState();
    const carId = state.cars.activeCarId;

    try {
      const response = await instance.get(`queues/${carId}`);

      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data.message);
    }
  },
);

export const callStudents = createAsyncThunk(
  "queue/callStudents",
  async (_, thunkApi) => {
    const { getState, rejectWithValue } = thunkApi;
    const state = getState();
    const carId = state.cars.activeCarId;
    try {
      const response = await instance.patch(`queues/call`, {
        carId,
      });

      if (response.status === 204) {
        return { noQueue: true };
      }

      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data.message);
    }
  },
);

export const startPractice = createAsyncThunk(
  "queue/startPractice",
  async (_, thunkApi) => {
    const { getState, rejectWithValue } = thunkApi;
    const state = getState();
    const carId = state.cars.activeCarId;
    try {
      const response = await instance.patch(`queues/start`, {
        carId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data.message);
    }
  },
);

export const endPractice = createAsyncThunk(
  "queue/endPractice",
  async (_, thunkApi) => {
    const { getState, rejectWithValue } = thunkApi;
    const state = getState();
    const carId = state.cars.activeCarId;
    try {
      const response = await instance.patch(`queues/end`, {
        carId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response?.data.message);
    }
  },
);

export const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCarsQueues.pending, (state) => {
      state.loadingGet = true;
    });
    builder.addCase(getCarsQueues.fulfilled, (state, action) => {
      state.car = action.payload.car;
      state.queues = action.payload.carQueues;
      state.loadingGet = false;
    });
    builder.addCase(getCarsQueues.rejected, (state, action) => {
      state.loadingGet = false;
      state.message = action.payload;
    });
    builder.addCase(callStudents.pending, (state) => {
      state.loadingPost = true;
    });
    builder.addCase(callStudents.fulfilled, (state, action) => {
      console.log(action.payload.noQueue);
      console.log(Boolean(action.payload.noQueue));
      console.log(action.payload);
      if (action.payload.noQueue) {
        state.loadingPost = false;
        return;
      }

      state.queues = action.payload.updatedQueues;
      state.car = action.payload.car;
      state.loadingPost = false;
    });
    builder.addCase(callStudents.rejected, (state, action) => {
      state.message = action.payload;
      state.loadingPost = false;
    });
    builder.addCase(startPractice.pending, (state) => {
      state.loadingPost = true;
    });
    builder.addCase(startPractice.fulfilled, (state, action) => {
      state.queues = action.payload.updatedQueues;
      state.car = action.payload.car;
      state.loadingPost = false;
    });
    builder.addCase(startPractice.rejected, (state, action) => {
      state.message = action.payload;
      state.loadingPost = false;
    });
    builder.addCase(endPractice.pending, (state) => {
      state.loadingPost = true;
    });
    builder.addCase(endPractice.fulfilled, (state, action) => {
      state.queues = [];
      state.car = action.payload.car;
      state.loadingPost = false;
    });
    builder.addCase(endPractice.rejected, (state, action) => {
      state.message = action.payload;
      state.loadingPost = false;
    });
  },
});

export default queueSlice.reducer;
