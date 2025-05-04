
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Renders the nested routes */}
    </>
  );
};

export default Layout;
