import { useEffect, useState } from "react";
import { Ratings } from "./Rating";
import { mapApiResponseToBook } from "../utils/mapper";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";
import { addOrRemoveBookFromCart } from "../utils/cart";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export default function FeaturedBooks() {
  const cart = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  const [books, setBooks] = useState<Book[]>([]);
  console.log("FEATURED", books);
  console.log("CART", cart);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${BASE_URL}/api/v1/catalog/featured-books`);
      const { response } = await res.json();

      setBooks(
        response.data.map((book: any): Book => mapApiResponseToBook(book))
      );
    }

    fetchData();
  }, []);
  return (
    <div className="mt-[6rem]">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-left mb-7">
          BOOKTOPIA FEATURED BOOKS
        </h2>
        <a href="#" className="text-pink-400">
          View all
        </a>
      </div>
      <div className="h-[1px] bg-zinc-300 mb-12"></div>
      <div className="grid grid-cols-3 gap-10">
        {books.length > 0
          ? books.map((book: Book) => (
              <a
                key={book?.id}
                href="#"
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover w-full rounded-t-lg h-full  md:w-48 md:rounded-none md:rounded-s-lg"
                  src={book?.imageUrl}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <div className="flex items-center">
                    <span className="mr-3">
                      {Number(book?.rating).toFixed(1)}
                    </span>

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

                  <h2 className="text-2xl text-left">
                    {book?.bookPricing?.cost.amount == 0
                      ? "Free"
                      : book?.bookPricing?.cost.amount.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}{" "}
                  </h2>

                  <Button
                    className="flex w-[150px] rounded-full mt-4 bg-pink-400"
                    onClick={(e) => {
                      e.preventDefault();

                      dispatch(addOrRemoveBookFromCart(book, cart.books));
                    }}
                  >
                    {cart.books.some((b: Book) => b.id == book.id)
                      ? "Remove from Cart"
                      : "Add to Cart"}
                  </Button>
                </div>
              </a>
            ))
          : null}
      </div>
    </div>
  );
}
