import { Box } from "@mui/material";
import CarList from "@modules/CarList/ui/CarList";

const OperatorPage = () => {
  return (
    <>
      <Box sx={{ background: "#000", width: "300px", padding: "7px" }}>
        <CarList />
      </Box>
      <Box sx={{ background: "#fff", width: "100%" }}> jjjjj</Box>
    </>
  );
};

export default OperatorPage;
