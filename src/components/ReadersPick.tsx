import { useEffect, useState } from "react";

export default function ReadersPick() {
  const [books, setBooks] = useState<any>([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:8080/api/v1/catalog/books"
      );
      const data = await response.json();
      console.log(data);
      setBooks(data.data);
    }

    fetchData();
  }, []);
  return (
    <div className="mt-[6rem]">
      <h2 className="font-semibold text-xl text-left mb-7">READER'S PICK</h2>
      <div className="h-[1px] bg-zinc-300 mb-12"></div>
      <div className="grid grid-cols-3 gap-10">
        {books.length > 0
          ? books.map((book: any) => (
              <a
                href="#"
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover w-full rounded-t-lg h-full  md:w-48 md:rounded-none md:rounded-s-lg"
                  src={book.imageUrl}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
                    {book.title}
                  </h5>
                  <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left">
                    {book.authors[0] +
                      (book.authors.length > 1 ? " and others" : "")}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-left">
                    {book.publishedDate.substring(0, 4)} | {book.publisher}
                  </p>

                  <h2 className="text-2xl text-left">
                    {book.cost.amount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                    {book.cost.currencyCode}
                  </h2>
                </div>
              </a>
            ))
          : null}
      </div>
    </div>
  );
}