import useAuth from "@shared/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ProtectedRoute = (props) => {
  const { children } = props;
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.log(userId);
      navigate("/");
    }
  }, [userId, navigate]);

  return children;
};

export default ProtectedRoute;
