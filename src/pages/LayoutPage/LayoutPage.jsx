import { Outlet } from "react-router";

const LayoutPage = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Outlet />
    </div>
  );
};

export default LayoutPage;
