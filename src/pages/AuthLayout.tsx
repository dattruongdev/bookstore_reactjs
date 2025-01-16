import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { login } from "../redux/slices/userSlice";
import { useAuth } from "../hooks/use-auth";

export default function AuthLayout() {
  const { user, token, dispatch } = useAuth();
  const navigate = useNavigate();

  if (user && token) {
    navigate("/books");
  } else {
    const token = localStorage.getItem("token");

    if (!token) {
      return (
        <div className="absolute inset-0 flex overflow-hidden">
          <div className="flex flex-col flex-[1] h-full  justify-center items-center relative">
            <div className="absolute top-0 bottom-0 w-2/3 right-0 translate-x-5 z-[1] bg-white rounded-full scale-125"></div>
            <div className="h-1/2 w-2/3 shadow-2xl px-5 py-7 rounded-xl flex flex-col z-[2]">
              <Outlet />
            </div>
          </div>

          <div className="flex-[1] bg-blue-600 hidden lg:flex items-center justify-center">
            <img
              src="/loginicon.png"
              alt=""
              className="h-[100px] object-cover"
            />
          </div>
        </div>
      );
    }

    dispatch(login(token + ""));
    navigate("/books");
  }
}
