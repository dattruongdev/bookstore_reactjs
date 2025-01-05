import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addOrRemoveBookFromCart } from "../utils/cart";
import { RootState } from "../redux/store";

type Props = {
  book: Book;
};

export default function CartButton({ book }: Props) {
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(addOrRemoveBookFromCart(book, cart.books));
      }}
      className={cn(
        "mr-2 bg-pink-400 px-5 rounded-full text-white",
        cart &&
          cart.books &&
          cart.books.some((b: Book) => b?.id == book?.id) &&
          "bg-purple-500"
      )}
    >
      {cart && cart.books && cart.books.some((b: Book) => b?.id == book?.id)
        ? "Remove cart"
        : "Add cart"}
      <ShoppingCart color="white" />
    </Button>
  );
}
