import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addOrRemoveBookFromCart } from "../utils/cart";
import { RootState } from "../redux/store";
import { BookCartItem } from "../redux/slices/cartSlice";

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

        dispatch(
          addOrRemoveBookFromCart(
            book,
            cart.items.map((b: BookCartItem) => b.book)
          )
        );
      }}
      className={cn(
        "mr-2 bg-pink-400 px-5 rounded-full text-white",
        cart &&
          cart.items &&
          cart.items.some((b: BookCartItem) => b?.book?._id == book?._id) &&
          "bg-purple-500"
      )}
    >
      {cart &&
      cart.items &&
      cart.items.some((b: BookCartItem) => b?.book?._id == book?._id)
        ? "Remove cart"
        : "Add cart"}
      <ShoppingCart color="white" />
    </Button>
  );
}
