import { Box, Typography } from "@mui/material";

const CarItem = () => {
  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: "5px",
        paddingLeft: "10px",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <Typography fontSize={16} padding={"6px"} marginTop={"7px"}>
        Машина: <span style={{ fontWeight: "600" }}>1</span>
      </Typography>
      <Typography fontSize={16} padding={"6px"}>
        Категория: <span style={{ fontWeight: "600" }}>BA</span>
      </Typography>

      <Typography fontSize={16} padding={"6px"} marginBottom={"7px"}>
        Кол-во студентов: <span style={{ fontWeight: "600" }}>Свободно</span>
      </Typography>
      <Box
        sx={{
          width: "10px",
          height: "100%",
          background: "#F24747",
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
