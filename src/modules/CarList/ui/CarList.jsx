import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsCars } from "../model/carListSlice";
import CarItem from "./CarItem";
import AddCar from "./AddCar";
import { Box } from "@mui/material";

const CarList = () => {
  const cars = useSelector((state) => state.car.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartmentsCars());
  }, [dispatch]);

  if (cars.length === 0) {
    return <Box sx={{}}>Нет такой очереди</Box>;
  }

  return (
    <>
      <AddCar />
      <CarItem />
      <CarItem />
      <CarItem />
    </>
  );
};

export default CarList;
