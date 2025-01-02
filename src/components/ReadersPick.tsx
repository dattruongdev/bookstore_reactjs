import { useEffect, useState } from "react";
import { mapApiResponseToBook } from "../utils/mapper";
import { Check, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { addOrRemoveBookFromCart } from "../utils/cart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export default function ReadersPick() {
  const [books, setBooks] = useState<Book[]>([]);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${BASE_URL}/api/v1/catalog/readers-pick-books`);
      const { response } = await res.json();

      setBooks(
        response.data.map((book: any): Book => mapApiResponseToBook(book))
      );
    }

    fetchData();
  }, []);
  return (
    <div className="mt-[6rem] bg-zinc-100 p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-left mb-7">READER'S PICK</h2>

        <a href="#" className="text-pink-400">
          View all
        </a>
      </div>
      <div className="h-[1px] bg-zinc-300 mb-12"></div>
      <div className="grid grid-cols-3 gap-10">
        {books.length > 0
          ? books.map((book: any) => (
              <div
                key={book?.id}
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
                    onClick={() =>
                      dispatch(addOrRemoveBookFromCart(book, cart.books))
                    }
                  >
                    {cart.books.find((b) => b.id === book.id) ? (
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
                    {/* <span className="flex items-center gap-1">
                      <Star size={13} className="mr-1" />
                      {Number(book?.rating).toFixed(1)}
                    </span>
                    | {book?.publishedDate.substring(0, 4)} |{" "}
                    <span>
                      {book?.categories[0] +
                        (book?.categories.length > 1 ? "..." : "")}
                    </span> */}
                    <span className="flex items-center mr-1">
                      <Star size={13} className="mr-1" />
                      {Number(book?.rating).toFixed(1)}
                    </span>{" "}
                    |
                    <span className="mx-1">
                      {book?.publishedDate.substring(0, 4)} |
                    </span>
                    <span className="text-nowrap">
                      {book?.categories[0] +
                        (book?.categories.length > 1 ? "..." : "")}
                    </span>
                  </p>

                  <div className="flex items-center justify-center">
                    <h2 className="text-2xl text-pink-400">
                      {book?.bookPricing?.cost.amount == 0
                        ? "Free"
                        : book?.bookPricing?.cost.amount.toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                      {" | "}
                    </h2>

                    <a href="#" className="text-pink-400 underline ml-3">
                      More
                    </a>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
