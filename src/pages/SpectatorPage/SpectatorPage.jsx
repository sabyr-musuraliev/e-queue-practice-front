import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router";
import WindowCard from "@modules/CarQueues/ui/WindowCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsQueues } from "@modules/CarQueues/model/carQueueSlice";
import useAuth from "@shared/hooks/useAuth";
import { socket } from "@shared/utils/socket";
import {
  updateQueue,
  removeQueue,
} from "@modules/CarQueues/model/carQueueSlice";
import { playNotificationSound } from "../../shared/utils/notification";

const SpectatorPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { departmentId } = useAuth();
  const carsQueues = useSelector((state) => state.carQueues.carsQueues);

  useEffect(() => {
    dispatch(getDepartmentsQueues(departmentId));
  }, []);

  useEffect(() => {
    // socket.emit("join-department", departmentId);

    socket.on("call-students", (data) => {
      dispatch(updateQueue(data));
      playNotificationSound();
    });

    socket.on("start-practice", (data) => {
      dispatch(updateQueue(data));
    });

    socket.on("end-practice", (data) => {
      dispatch(removeQueue(data));
    });

    return () => {
      socket.off("call-students");
      socket.off("start-practice");
      socket.off("end-practice");
    };
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  let content = carsQueues.map((window) => (
    <WindowCard
      key={window.number}
      number={window.number}
      status={window.status}
      tickets={window.tickets}
    />
  ));

  if (carsQueues.length === 0) {
    content = (
      <Box sx={{ padding: "30px", fontSize: "24px", fontWeight: "600" }}>
        Нет сдающих студентов
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          background: "#000",
          width: "7px",
          padding: "7px",
          overflow: "hidden",
          transition: "width 0.3s ease",
          "&:hover": {
            width: "300px",
            overflow: "auto",
          },
        }}
      >
        <Button
          onClick={handleLogout}
          fullWidth
          variant="contained"
          sx={{
            textTransform: "none",
            padding: "10px 30px",
          }}
        >
          Выйти из системы
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {content}
      </Box>
    </>
  );
};

export default SpectatorPage;
