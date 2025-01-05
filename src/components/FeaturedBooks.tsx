import { useEffect, useState } from "react";
import { Ratings } from "./Rating";
import { mapApiResponseToBook } from "../utils/mapper";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";
import { addOrRemoveBookFromCart } from "../utils/cart";
import BookCard from "./BookCard";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export default function FeaturedBooks() {
  const cart = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  const [books, setBooks] = useState<Book[]>([]);

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
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-center">
        {books.length > 0
          ? books.map((book: Book) => (
              <BookCard key={book.id} book={book} direction="horizontal" />
            ))
          : null}
      </div>
    </div>
  );
}
