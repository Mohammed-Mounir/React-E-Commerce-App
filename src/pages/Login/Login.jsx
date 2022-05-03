import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.currentUser?.isAdmin) {
      location.state?.from
        ? navigate(location.state.from, { replace: true })
        : navigate("/", { replace: true });
    }
  }, [user, navigate, location]);

  const loginHandler = () => {
    if (!username.trim().length || !password.trim().length) return;

    login(dispatch, { username, password });
  };

  return (
    <div className="login">
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Login;
