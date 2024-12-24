import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Search } from "lucide-react";

function Navbar() {
  return (
    <div className=" flex justify-between items-center w-full">
      <div className="navbar-start">
        <a className="btn btn-ghost text-3xl">Booktopia</a>
      </div>
      <ul className="flex items-center gap-8">
        <li>
          <a>Book Shop</a>
        </li>
        <li>
          <a>Book Details</a>
        </li>
        <li>
          <a>Blogs</a>
        </li>
        <li>
          <a>Events</a>
        </li>
      </ul>
      <div className="navbar-end">
        <Button variant={"ghost"}>
          <Search size={50} />
        </Button>
        <Button variant={"ghost"}>
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
