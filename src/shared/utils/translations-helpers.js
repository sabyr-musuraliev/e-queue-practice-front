export const getTranslatedStatus = (word) => {
  switch (word) {
    case "available":
      return "Свободно";
    case "in-progress":
      return "На экзамене";
    case "calling":
      return "Вызывается";
    default:
      break;
  }
};
