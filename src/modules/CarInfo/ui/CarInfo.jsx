import { Box, Typography, Chip } from "@mui/material";
import ManageQueue from "./ManageQueue";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCarsQueues } from "../model/carInfoSlice";
import { getTranslatedStatus } from "@shared/utils/translations-helpers";

const CarInfo = () => {
  const car = useSelector((state) => state.queues.car);
  const queues = useSelector((state) => state.queues.queues);
  const activeCarId = useSelector((state) => state.cars.activeCarId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeCarId !== null) {
      dispatch(getCarsQueues());
    }
  }, [activeCarId, dispatch]);

  let queueList = queues.map((item) => {
    return (
      <Chip
        label={item.ticketNumber}
        key={item._id}
        sx={{
          margin: "12px",
          backgroundColor: "#519FE8",
          color: "#fff",
          fontWeight: "600",
        }}
      />
    );
  });

  if (queues.length === 0) {
    queueList = <Typography margin={2}>Пока очереди нет</Typography>;
  }

  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Box sx={{ width: "700px", marginTop: "50px" }}>
        <Typography variant="h5">Информация о машине</Typography>
        <Box sx={{ display: "flex" }}>
          <Typography margin={2}>Талоны:</Typography>
          {queueList}
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography margin={2}>Текущий статус:</Typography>
          <Chip
            label={getTranslatedStatus(car.status)}
            sx={{
              margin: "12px",
              color: "#fff",
              backgroundColor: `${car.status === "available" ? "#5DE851" : "#F24747"}`,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <ManageQueue />
        </Box>
      </Box>
    </Box>
  );
};

export default CarInfo;
