import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewCar } from "../model/carListSlice";
import useAuth from "@shared/hooks/useAuth";

const categoryType = [
  {
    name: "BA",
    value: "BA",
  },
  {
    name: "BM",
    value: "BM",
  },
  {
    name: "C",
    value: "C",
  },
  {
    name: "C1",
    value: "C1",
  },
];

const AddCar = () => {
  const [open, setOpen] = useState(false); // Управление открытием модального окна
  const [carParams, setCarParams] = useState({
    name: "",
    category: "",
    isAvailable: true,
  });
  const dispatch = useDispatch();
  const { departmentId } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    dispatch(
      addNewCar({
        departmentId,
        carNumber: carParams.name,
        carType: carParams.category,
      }),
    );
    handleClose();
  };
  return (
    <>
      <Button
        variant="contained"
        fullWidth
        sx={{ textTransform: "none" }}
        onClick={handleOpen}
      >
        Добавить машину
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            width: "400px",
          }}
        >
          <Typography variant="h6" marginBottom={2}>
            Добавить новую машину
          </Typography>
          <TextField
            label="Название машины"
            fullWidth
            margin="normal"
            name="name"
            value={carParams.name}
            onChange={handleChange}
          />
          <TextField
            label="Категория"
            fullWidth
            select
            defaultValue={categoryType[0].value}
            helperText="Выберите категорию"
            margin="normal"
            name="category"
            value={carParams.category}
            onChange={handleChange}
          >
            {categoryType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleSubmit}
          >
            Добавить
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddCar;
