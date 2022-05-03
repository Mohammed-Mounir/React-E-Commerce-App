import { Navigate, Outlet } from "react-router";
import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/Sidebar/Sidebar";

const useAuth = () => {
  return localStorage.getItem("persist:root")
    ? JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
        .currentUser?.isAdmin
    : false;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
