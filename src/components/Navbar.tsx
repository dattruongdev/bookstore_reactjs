import Cart from "./Cart";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Navbar() {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className=" flex justify-between items-center w-full">
      <div className="navbar-start">
        <a className="btn btn-ghost text-3xl">Booktopia</a>
      </div>
      <div className="navbar-end">
        <Cart books={cart.books} />
      </div>
    </div>
  );
}

export default Navbar;
