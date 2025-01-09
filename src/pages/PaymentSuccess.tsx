import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";

export default function PaymentSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearCart());
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
      <div className="h-1/3 w-1/3 bg-white shadow-md flex flex-col m-auto justify-center items-center gap-5">
        <div className="text-lg font-semibold">Payment success</div>
        <a
          href="/books"
          className="bg-green-400 py-3 px-5 text-sm rounded-full text-white hover:bg-green-400/80 hover:text-black"
        >
          Browse more books
        </a>
      </div>
    </div>
  );
}
