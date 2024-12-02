import { Box } from "@mui/material";
import CarList from "@modules/CarList/ui/CarList";
import CarInfo from "@modules/CarInfo/ui/CarInfo";
import PerfectScrollbar from "react-perfect-scrollbar";

const OperatorPage = () => {
  return (
    <>
      <PerfectScrollbar
        style={{
          maxWidth: "300px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            background: "#000",
            width: "300px",
            padding: "7px",
            overflow: "auto",
            minHeight: "100%",
          }}
        >
          <CarList />
        </Box>
      </PerfectScrollbar>
      <Box sx={{ background: "#fff", width: "100%" }}>
        <CarInfo />
      </Box>
    </>
  );
};

export default OperatorPage;
