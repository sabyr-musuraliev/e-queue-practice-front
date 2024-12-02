import { Box, Typography, Chip } from "@mui/material";
import { getTranslatedStatus } from "@shared/utils/translations-helpers";

const WindowCard = ({ number, status, tickets }) => {
  const isCalling = status === "calling";

  return (
    <Box
      sx={{
        background: isCalling ? "#5DE851" : "#519FE8", // Цвет для вызывающего окна
        width: "230px",
        padding: "20px",
        margin: "10px",
        borderRadius: "8px",
        color: "#fff",
        height: "220px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        №{number}
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginBottom: "15px", fontSize: "20px" }}
      >
        {getTranslatedStatus(status)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {tickets.map((ticket, index) => (
          <Chip
            key={index}
            label={ticket}
            sx={{
              background: "#000",
              color: "#fff",
              fontWeight: "bold",
              padding: "5px",
              fontSize: "20px",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default WindowCard;
