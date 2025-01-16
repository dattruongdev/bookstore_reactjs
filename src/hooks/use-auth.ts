import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";

const BASE_SERVER_URL = import.meta.env.VITE_BASE_SERVER_URL;

export function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    fetch(`${BASE_SERVER_URL}/api/v1/auth/verifyToken`, {
      method: "POST",
      body: JSON.stringify({ token }),
    }).then((res) => {
      if (res.ok) {
        dispatch(login(token));
      } else {
        localStorage.removeItem("token");
        dispatch(logout());
      }
    });
  }, []);

  return { user: auth.user, token: auth.token, dispatch };
}
