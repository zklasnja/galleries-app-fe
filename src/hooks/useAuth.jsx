import { authService } from "../services/AuthService";
import { useHistory } from "react-router-dom";
import { setToken, setUser, setOnlyUser } from "../store/user/slice";
import { selectUserData } from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";

export default function useAuth() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  const handleLogin = async (data) => {
    try {
      const response = await authService.login(data);
      dispatch(setUser(response.data));
    } catch (error) {}
  };

  const handleLogout = async () => {
    try {
      const response = await authService.logout();
      if (response) {
        localStorage.removeItem("token");
        dispatch(setToken(""));
      }
    } catch (error) {}
  };

  const handleRegister = async (data) => {
    try {
      const response = await authService.register(data);
      dispatch(setUser(response.data));
      history.push("/login");
    } catch (error) {}
  };

  const handleRefreshToken = async () => {
    const token = handleGetItemFromLS("token");
    if (!!token) {
      try {
        const response = await authService.refresh();
        dispatch(setUser(response.data));
      } catch (error) {}
    }
  };

  const handleGetUserData = async (data) => {
    try {
      const response = await authService.me();
      dispatch(setOnlyUser(response.data));
    } catch (error) {}
  };

  const handleGetItemFromLS = (value) => {
    return localStorage.getItem(value);
  };

  return {
    user: user,
    login: handleLogin,
    logout: handleLogout,
    refresh: handleRefreshToken,
    register: handleRegister,
    getUser: handleGetUserData,
  };
}
