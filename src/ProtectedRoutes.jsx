import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/Sidebar/Sidebar";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const isAuth = user.currentUser ? user.currentUser?.isAdmin : false;

  return isAuth ? (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
