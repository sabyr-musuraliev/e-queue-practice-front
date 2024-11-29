import { configureStore } from "@reduxjs/toolkit";
import carReducer from "@modules/CarList/model/carListSlice";

export const store = configureStore({
  reducer: {
    cars: carReducer,
  },
});
