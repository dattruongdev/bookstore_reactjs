import Cart from "./Cart";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Navbar() {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className=" flex justify-between items-center w-full">
      <div className="navbar-start">
        <a className="btn btn-ghost text-3xl" href="/">
          Booktopia
        </a>
      </div>
      <div>
        <a href="/books?page=1">Go to Shelf</a>
      </div>
      <div className="navbar-end relative">
        <Cart />
        {cart.books.length > 0 && (
          <div className="rounded-full h-[15px] w-[15px] absolute bg-red-500 text-white top-1 right-1 text-xs">
            {cart.books.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
