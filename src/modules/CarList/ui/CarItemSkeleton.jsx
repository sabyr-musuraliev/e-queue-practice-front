import { Box, Typography } from "@mui/material";
import { getTranslatedStatus } from "@shared/utils/translations-helpers";
import { useDispatch } from "react-redux";
import { updateActiveCarId } from "../model/carListSlice";

const CarItem = (props) => {
  const { carId, carNumber, status, carType, isActive } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateActiveCarId(carId));
  };

  return (
    <Box
      sx={{
        background: `${isActive ? "#519FE8" : "#fff"}`,
        borderRadius: "5px",
        paddingLeft: "10px",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Typography
        fontSize={16}
        padding={"6px"}
        marginTop={"7px"}
        color={isActive ? "#fff" : "#000"}
      >
        Машина: <span style={{ fontWeight: "600" }}>{carNumber}</span>
      </Typography>
      <Typography
        fontSize={16}
        padding={"6px"}
        color={isActive ? "#fff" : "#000"}
      >
        Категория: <span style={{ fontWeight: "600" }}>{carType}</span>
      </Typography>

      <Typography
        fontSize={16}
        padding={"6px"}
        marginBottom={"7px"}
        color={isActive ? "#fff" : "#000"}
      >
        Статус:{" "}
        <span style={{ fontWeight: "600" }}>{getTranslatedStatus(status)}</span>
      </Typography>
      <Box
        sx={{
          width: "10px",
          height: "100%",
          background: `${status === "available" ? "#5DE851" : "#F24747"}`,
          position: "absolute",
          top: 0,
          borderBottomRightRadius: "5px",
          borderTopRightRadius: "5px",
          right: -1,
        }}
      ></Box>
    </Box>
  );
};

export default CarItem;
