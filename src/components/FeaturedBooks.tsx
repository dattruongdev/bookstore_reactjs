import { useEffect, useState } from "react";
import { mapApiResponseToBook } from "../utils/mapper";
import BookCard from "./BookCard";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export default function FeaturedBooks() {
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
    <div className="mt-[6rem]" id="featured">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-left mb-7">
          BOOKTOPIA FEATURED BOOKS
        </h2>
      </div>
      <div className="h-[1px] bg-zinc-300 mb-12"></div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-center">
        {books.length > 0
          ? books.map((book: Book) => (
              <BookCard key={book._id} book={book} direction="horizontal" />
            ))
          : null}
      </div>
    </div>
  );
}
