import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addOrRemoveBookFromCart } from "../utils/cart";
import { Ratings } from "./Rating";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Check, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartButton from "./CartButton";

type Props = {
  book: Book;
  direction: "horizontal" | "vertical";
  className?: string;
};

export default function BookCard({ book, direction, className }: Props) {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (direction === "horizontal") {
    return (
      <div
        onClick={() => navigate(`/books/${book?._id}`, { state: { book } })}
        key={book?._id}
        className={cn(
          "flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 max-w-[400px]",
          className
        )}
      >
        <img
          className="object-cover w-full rounded-lg h-full"
          src={book?.imageUrl}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <div className="flex items-center">
            <span className="mr-3">{Number(book?.rating).toFixed(1)}</span>

            <span className="mr-4">
              <Ratings rating={book?.rating ?? 5} />
            </span>
          </div>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
            {book?.title}
          </h5>
          <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left">
            {book?.authors[0].fullName +
              (book?.authors.length > 1 ? " and others" : "")}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-left">
            {book?.publishedDate.substring(0, 4)} | {book?.publisher}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-left">
            Available: {book?.numberOfCopies}
          </p>

          <h2 className="text-2xl text-left">
            {book?.bookPricing?.cost?.amount == 0
              ? "Free"
              : book?.bookPricing?.cost?.amount.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
          </h2>

          <CartButton book={book} />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate(`/books/${book?._id}`, { state: { book } })}
      key={book?._id}
      className=" flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 shrink-0 w-[350px] h-[500px]"
    >
      <div className="relative mb-auto w-full h-2/3">
        <img
          className="object-cover w-full rounded-t-lg h-full"
          src={book?.imageUrl}
          alt=""
        />

        <Button
          className="absolute right-0 bg-pink-400 z-[2] bottom-0 p-3"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            dispatch(
              addOrRemoveBookFromCart(
                book,
                cart.items.map((i) => i.book)
              )
            );
          }}
        >
          {cart.items.find((item) => item?.book?._id === book?._id) ? (
            <Check size={20} color={"white"} />
          ) : (
            <ShoppingCart size={20} color={"white"} />
          )}
        </Button>
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {book?.title}
        </h5>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
          {book?.authors[0]?.fullName}
          {book?.authors?.length > 1 ? " and the others" : ""}
        </p>
        <p className="flex items-center mb-1 font-normal text-gray-700 dark:text-gray-400 m-auto">
          <span className="flex items-center mr-1">
            <Star size={13} className="mr-1" />
            {Number(book?.rating).toFixed(1)}
          </span>{" "}
          |<span className="mx-1">{book?.publishedDate.substring(0, 4)} |</span>
          <span className="text-nowrap">{book?.publisher}</span>
        </p>

        <div className="flex items-center justify-center">
          <h2 className="text-2xl text-pink-400">
            {book?.bookPricing?.cost?.amount == 0
              ? "Free"
              : book?.bookPricing?.cost?.amount.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
            {" | "}
          </h2>

          <p className="text-pink-400 underline ml-3">
            Available: {book?.numberOfCopies}
          </p>
        </div>
      </div>
    </div>
  );
}
