import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      fullWidth
      sx={{
        textTransform: "none",
        padding: "10px 30px",
      }}
    >
      Выйти из системы
    </Button>
  );
};

export default Logout;
