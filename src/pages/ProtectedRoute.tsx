import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { login } from "../redux/slices/userSlice";
import { useAuth } from "../hooks/use-auth";

export default function ProtectedRoute(): React.ReactNode {
  // const { user, token, dispatch } = useAuth();
  // console.log("IN BOOK PAYMENT", user, token);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user || token) {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       dispatch(login(token));
  //     } else {
  //       navigate("/auth/login");
  //     }
  //   } else {
  //     navigate("/auth/login");
  //   }
  // }, [token]);
  return (
    <>
      <Outlet />
    </>
  );
}
