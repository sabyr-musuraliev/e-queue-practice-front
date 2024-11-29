import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem("token");

  let userId = "";
  let username = "";
  let role = "idle";
  let departmentId = "";
  let departmentName = "";
  let name = "";

  const processToken = (decodedToken) => {
    return {
      userId: decodedToken.user,
      username: decodedToken.username,
      role: decodedToken.role,
      name: decodedToken.name,
      departmentId: decodedToken.departmentId,
      departmentName: decodedToken.name,
    };
  };

  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      const decodedData = processToken(decodedToken);

      userId = decodedData.userId;
      username = decodedData.username;
      role = decodedData.role;
      departmentId = decodedData.departmentId;
      departmentName = decodedData.departmentName;
      name = decodedData.name;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem("token");
  }

  return {
    userId,
    username,
    role,
    departmentId,
    departmentName,
    name,
  };
};

export default useAuth;
