import { Button, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  callStudents,
  endPractice,
  startPractice,
} from "../model/carInfoSlice";
import { useState } from "react";
import { removeCar } from "@modules/CarList/model/carListSlice";

const ManageQueue = () => {
  const car = useSelector((state) => state.queues.car);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCallStudents = async () => {
    const resultAction = await dispatch(callStudents());

    console.log(
      callStudents.fulfilled.match(resultAction) &&
        resultAction.payload?.noQueue,
    );

    if (
      callStudents.fulfilled.match(resultAction) &&
      resultAction.payload?.noQueue
    ) {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          Очередь пуста, студентов нет!
        </Alert>
      </Snackbar>
      {car.status === "available" && (
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleCallStudents}
        >
          Позвать студентов
        </Button>
      )}
      {car.status === "available" && (
        <Button
          variant="contained"
          sx={{ textTransform: "none", background: "#F24747" }}
          onClick={() => dispatch(removeCar())}
        >
          Удалить машину
        </Button>
      )}
      {car.status === "calling" && (
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={() => dispatch(startPractice())}
        >
          Начать экзамен
        </Button>
      )}
      {car.status === "in-progress" && (
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={() => dispatch(endPractice())}
        >
          Окончить экзамен
        </Button>
      )}
    </>
  );
};

export default ManageQueue;
