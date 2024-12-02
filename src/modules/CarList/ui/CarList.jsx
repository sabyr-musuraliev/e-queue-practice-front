import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsCars, updateActiveCarId } from "../model/carListSlice";
import CarItem from "./CarItem";
import AddCar from "./AddCar";
import { Box } from "@mui/material";
import useAuth from "@shared/hooks/useAuth";
import Logout from "./Logout";

const CarList = () => {
  const cars = useSelector((state) => state.cars.cars);
  const dispatch = useDispatch();
  const activeCarId = useSelector((state) => state.cars.activeCarId);
  const { departmentId } = useAuth();

  useEffect(() => {
    dispatch(getDepartmentsCars(departmentId));
  }, [dispatch]);

  useEffect(() => {
    if (cars && cars.length > 0 && !activeCarId) {
      dispatch(updateActiveCarId(cars[0]._id));
    }
  }, [cars]);

  let list = null;

  if (cars.length === 0) {
    list = <Box sx={{}}>Нет такой очереди</Box>;
  }

  list = cars.map((item) => {
    return (
      <CarItem
        key={item._id}
        carType={item.carType}
        status={item.status}
        carNumber={item.carNumber}
        carId={item._id}
        isActive={item._id === activeCarId}
      />
    );
  });

  return (
    <>
      <AddCar />
      {list}
      <Logout />
    </>
  );
};

export default CarList;
