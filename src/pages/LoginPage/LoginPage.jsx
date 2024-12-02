import { useState, useEffect } from "react";
import { Box } from "@shared/ui/Box/Box";
import { TextField, Button, Alert, Snackbar } from "@mui/material";
import useAuth from "@shared/hooks/useAuth";
import { useNavigate } from "react-router";
import { instance } from "@shared/utils/axios-instance";
import cls from "./LoginPage.module.scss";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseLoading, setResponseLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { userId, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate(role);
    }
  }, []);

  const handleLogin = async () => {
    setResponseLoading(true);
    try {
      const response = await instance.post("auth/login", {
        username,
        password,
      });

      if (!response.data) {
        setSnackbarMessage("Ошибка при входе в систему");
        setOpenSnackbar(true);
        setSnackbarSeverity("error");
        setResponseLoading(false);
      } else {
        setUsername("");
        setPassword("");
        setSnackbarMessage("Пользователь успешно вошел");
        setSnackbarSeverity("success");
        localStorage.setItem("token", response.data.accessToken);
        setResponseLoading(false);
        navigate(response.data.path);
      }
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error.response?.data.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setResponseLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box
        classNames={cls.wrapper}
        direction="column"
        justify="center"
        align="center"
      >
        <Box
          shadow
          classNames={cls.login}
          direction="column"
          justify="center"
          align="center"
        >
          <TextField
            label="Логин"
            type="text"
            fullWidth
            disabled={responseLoading}
            value={username}
            margin="dense"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            margin="dense"
            disabled={responseLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            disabled={responseLoading}
            onClick={handleLogin}
            variant="contained"
            sx={{ margin: "10px 0" }}
          >
            Войти
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
