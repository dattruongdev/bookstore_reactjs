import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function NewRelease() {
  const [books, setBooks] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "http://localhost:8080/api/v1/catalog/new-release-books"
      );
      const { response } = await res.json();
      console.log(response);
      setBooks(response.data);
    }

    fetchData();
  }, []);
  return (
    <div className="mt-[6rem]">
      <h2 className="font-semibold text-xl text-left mb-7">NEW RELEASE</h2>
      <div className="h-[1px] bg-zinc-300 mb-12"></div>
      {/* Cards here */}

      <div className="flex items-center overflow-hidden gap-5 px-10">
        {books && books[0] && (
          <a
            href="#"
            className="w-1/2 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 "
          >
            <img
              className="object-cover w-full rounded-t-lg h-full  md:w-48 md:rounded-none md:rounded-s-lg"
              src={books[0].imageUrl}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
                {books[0].title}
              </h5>
              <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left">
                {books[0].authors[0].fullName +
                  (books[0].authors.length > 1 ? " and others" : "")}
              </p>

              <h2 className="text-2xl text-left">
                {books[0].cost.amount.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </h2>
            </div>
          </a>
        )}

        {/* other deals */}
        <Carousel className="w-1/2">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/2">
                <div className=" flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 shrink-0">
                  <img
                    className="object-cover w-full rounded-t-lg h-full  md:w-48 md:rounded-none md:rounded-s-lg"
                    src=""
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Book title
                    </h5>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                      Book author
                    </p>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                      Book date | category
                    </p>

                    <h2 className="text-2xl">Book cost</h2>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-full translate-y-1/2 translate-x-2 border border-pink-400 hover:bg-pink-400" />
          <CarouselNext className="left-full -translate-y-1/2 translate-x-2 border border-pink-400 hover:bg-pink-400" />
        </Carousel>
      </div>
    </div>
  );
}
