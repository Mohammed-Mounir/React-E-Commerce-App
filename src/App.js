import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import UserList from "./pages/UserList/UserList";
import User from "./pages/User/User";
import NewUser from "./pages/NewUser/NewUser";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import NewProduct from "./pages/NewProduct/NewProduct";
import Login from "./pages/Login/Login";
import "./App.css";

const AppLayout = ({ admin }) =>
  admin ? (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  ) : null;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout admin={true} />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/new-user" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/new-product" element={<NewProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
