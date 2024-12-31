import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { mapApiResponseToBook } from "../utils/mapper";
import { Ratings } from "./Rating";
import { Button } from "./ui/button";
import { ShoppingCart, Star } from "lucide-react";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export default function NewRelease() {
  const [books, setBooks] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${BASE_URL}/api/v1/catalog/new-release-books`);
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
        <h2 className="font-semibold text-xl text-left mb-7">NEW RELEASE</h2>

        <a href="#" className="text-pink-400">
          View all
        </a>
      </div>
      <div className="h-[1px] bg-zinc-300 mb-12"></div>
      {/* Cards here */}

      <div className="flex items-center justify-center overflow-hidden gap-5 px-10">
        {books && books[0] && (
          <a
            key={books[0]?.id}
            href="#"
            className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 w-1/2 h-[500px]"
          >
            <img
              className="object-cover w-1/3 rounded-t-lg h-1/2 mr-3"
              src={books[0]?.imageUrl}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <div className="flex items-center">
                <span className="mr-3">
                  {Number(books[0]?.rating).toFixed(1)}
                </span>

                <span className="mr-4">
                  <Ratings rating={books[0]?.rating ?? 5} />
                </span>
              </div>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
                {books[0]?.title}
              </h5>
              <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left">
                {books[0]?.authors[0].fullName +
                  (books[0]?.authors.length > 1 ? " and others" : "")}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-left">
                {books[0]?.publishedDate.substring(0, 4)} |{" "}
                {books[0]?.publisher}
              </p>

              <h2 className="text-2xl text-left">
                {books[0]?.bookPricing?.cost.amount == 0
                  ? "Free"
                  : books[0]?.bookPricing?.cost.amount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
              </h2>

              <Button className="flex w-[150px] rounded-full mt-4 bg-pink-400">
                Add to Cart
              </Button>
            </div>
          </a>
        )}

        {/* other deals */}
        <Carousel className="w-1/2">
          <CarouselContent>
            {books.length > 1
              ? books.slice(1).map((book: Book, index: number) => (
                  <CarouselItem key={index} className="basis-1/2">
                    <div className=" flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 shrink-0 w-[300px] h-[500px]">
                      <div className="relative mb-auto w-full h-2/3">
                        <img
                          className="object-cover w-full rounded-t-lg h-full"
                          src={book?.imageUrl}
                          alt=""
                        />

                        <div className="absolute right-0 bg-pink-400 z-[2] bottom-0 p-3">
                          <ShoppingCart size={20} color={"white"} />
                        </div>
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
                          <Star size={13} className="mr-1" />
                          {Number(book?.rating).toFixed(1)} |{" "}
                          {book?.publishedDate.substring(0, 4)} |{" "}
                          {book?.categories[0] +
                            (book?.categories.length > 1 ? "..." : "")}
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
                  </CarouselItem>
                ))
              : null}
          </CarouselContent>
          <CarouselPrevious className="left-full translate-y-1/2 translate-x-2 border border-pink-400 hover:bg-pink-400" />
          <CarouselNext className="left-full -translate-y-1/2 translate-x-2 border border-pink-400 hover:bg-pink-400" />
        </Carousel>
      </div>
    </div>
  );
}
