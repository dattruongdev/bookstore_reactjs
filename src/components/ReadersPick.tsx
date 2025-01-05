import { useEffect, useState } from "react";
import { mapApiResponseToBook } from "../utils/mapper";
import BookCard from "./BookCard";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export default function ReadersPick() {
  const [books, setBooks] = useState<Book[]>([]);

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
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-center">
        {books.length > 0
          ? books.map((book: any) => (
              <BookCard key={book._id} book={book} direction="vertical" />
            ))
          : null}
      </div>
    </div>
  );
}
