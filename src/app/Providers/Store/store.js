import { configureStore } from "@reduxjs/toolkit";
import carReducer from "@modules/CarList/model/carListSlice";
import queueReducer from "@modules/CarInfo/model/carInfoSlice";
import carQueuesReducer from "@modules/CarQueues/model/carQueueSlice";

export const store = configureStore({
  reducer: {
    cars: carReducer,
    queues: queueReducer,
    carQueues: carQueuesReducer,
  },
});
