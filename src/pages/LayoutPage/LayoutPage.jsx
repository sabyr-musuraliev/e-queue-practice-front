import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Outlet />
    </div>
  );
};

export default LayoutPage;
