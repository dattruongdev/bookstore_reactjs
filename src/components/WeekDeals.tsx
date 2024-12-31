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

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

type OtherDealsProps = {
  books: Book[];
};

const OtherDeals = ({ books }: OtherDealsProps) => {
  console.log("OTHER DEALS", books);
  return (
    <Carousel className="">
      <CarouselContent className="grid grid-rows-2 grid-flow-col gap-x-80 gap-y-8 w-full">
        {books.map((book: Book, index: number) => (
          <CarouselItem key={index} className="min-w-80 w-full">
            <div className=" flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 shrink-0 w-[600px] min-h-[220px] h-full">
              <img
                className="object-cover w-full rounded-t-lg h-full"
                src={book?.imageUrl}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal text-left">
                <div className="flex items-center ">
                  <div className="flex items-center">
                    <span className="mr-3">
                      {Number(book?.rating).toFixed(1)}
                    </span>

                    <span className="mr-4">
                      <Ratings rating={book?.rating ?? 5} />
                    </span>
                  </div>

                  <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                    {book?.authors[0].fullName}
                    {book?.authors.length > 1 ? " and the others" : ""}
                  </p>
                </div>
                <div className="flex">
                  <div>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {book?.title}
                    </h5>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                      {book?.publishedDate.substring(0, 4)} |{" "}
                      {book?.categories[0] +
                        (book?.categories.length > 1 ? "..." : "")}
                    </p>

                    <h2 className="text-2xl text-left text-pink-500 flex items-center gap-4 my-3">
                      {book?.bookPricing?.cost.amount == 0
                        ? "Free"
                        : book?.bookPricing?.cost.amount.toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                      <span className="text-sm text-zinc-500 line-through">
                        {book?.bookPricing?.originalCost.amount == 0
                          ? "Free"
                          : book?.bookPricing?.originalCost.amount.toLocaleString(
                              "it-IT",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )}
                      </span>
                    </h2>
                  </div>
                  <div className="flex items-center justify-center grow scale-75">
                    <div className="w-[90px] h-[90px] rotate-12 relative">
                      <img src="/sale_off.png" className="w-full h-full" />
                      <div className="text-xs flex flex-col absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <span className="text-lg">
                          {(Number(book?.bookPricing?.discount) * 100).toFixed(
                            0
                          )}
                          %
                        </span>
                        OFF
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progression */}
                <div className="h-3 rounded-full bg-zinc-200 relative overflow-hidden mt-5">
                  <div
                    className="absolute top-0 bottom-0 w-1/2 bg-pink-400 rounded-full"
                    style={{}}
                  ></div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
        {/* {books.map((deal: any, index: number) => (
        ))} */}
      </CarouselContent>
      <CarouselPrevious className="left-full translate-y-1/2 translate-x-2 border border-pink-400 hover:bg-pink-400" />
      <CarouselNext className="left-full -translate-y-1/2 translate-x-2 border border-pink-400 hover:bg-pink-400" />
    </Carousel>
  );
};
export default function WeekDeals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [timerDays, setTimerDays] = useState<number>(0);
  const [timerHours, setTimerHours] = useState<number>(0);
  const [timerMinutes, setTimerMinutes] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  let interval: any;

  function startTimer() {
    const countdownDate = new Date(books[0]?.bookPricing?.endDate);

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimerDays(days);
      setTimerHours(hours);
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${BASE_URL}/api/v1/catalog/week-deals`);
      const { response } = await res.json();

      setBooks(
        response.data.map((book: any): Book => mapApiResponseToBook(book))
      );
    }

    fetchData();
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval);
    };
  }, [books]);

  console.log(books, "IN WEEKDEALS");

  return (
    <div className="mt-[6rem] min-h-[900px] flex flex-col bg-zinc-100 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-left mb-7">
          DEALS OF THE WEEK
        </h2>

        <a href="#" className="text-pink-400">
          View all
        </a>
      </div>
      <div className="h-[1px] bg-zinc-300 mb-12"></div>
      <div className="flex justify-end mb-8">
        <span className="font-bold mx-2">{timerDays}</span> Days |
        <span className="font-bold mx-2">{timerHours}</span> Hours |
        <span className="font-bold mx-2">{timerMinutes}</span> Minutes |
        <span className="font-bold mx-2">{timerSeconds}</span> Seconds
      </div>

      <div className="flex items-center justify-center overflow-hidden gap-20 h-[400px] grow">
        <div className="flex-[1] min-w-1/2">
          <a
            href="#"
            className="flex grow-0 w-full flex-col items-start bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 h-[450px] relative"
          >
            <img
              className="object-cover w-2/3 rounded-lg h-2/3 absolute left-1/2 -translate-x-1/2 -translate-y-1/3"
              src={books[0]?.imageUrl}
              alt=""
            />

            <div className="h-[200px]"></div>
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
              <div className="flex w-full flex-[1]">
                <div>
                  <div className="flex items-center">
                    <span className="mr-3">
                      {Number(books[0]?.rating).toFixed(1)}
                    </span>

                    <span className="mr-4">
                      <Ratings rating={books[0]?.rating ?? 5} />
                    </span>
                  </div>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
                    {books[0]?.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 text-left">
                    {books[0]?.authors[0].fullName}
                    {books[0]?.authors?.length > 1 ? " and the others" : ""}
                  </p>

                  <h2 className="text-2xl text-left text-pink-500 flex items-center gap-4 my-3">
                    {books[0]?.bookPricing?.cost.amount == 0
                      ? "Free"
                      : books[0]?.bookPricing?.cost.amount.toLocaleString(
                          "it-IT",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                    <span className="text-sm text-zinc-500 line-through">
                      {books[0]?.bookPricing?.originalCost.amount == 0
                        ? "Free"
                        : books[0]?.bookPricing?.originalCost.amount.toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                    </span>
                  </h2>
                </div>

                <div className="flex items-center justify-center grow">
                  <div className="w-[90px] h-[90px] rotate-12 relative">
                    <img src="/sale_off.png" className="w-full h-full" />
                    <div className="text-xs flex flex-col absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                      <span className="text-lg">
                        {(
                          Number(books[0]?.bookPricing?.discount) * 100
                        ).toFixed(0)}
                        %
                      </span>
                      OFF
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div>Already Sold: 20</div>
                <div>Available: 6</div>
              </div>
              {/* Progression */}
              <div className="h-3 rounded-full bg-zinc-200 relative overflow-hidden mt-5">
                <div
                  className="absolute top-0 bottom-0 w-1/2 bg-pink-400 rounded-full"
                  style={{}}
                ></div>
              </div>
            </div>
          </a>
        </div>

        {/* other deals */}
        {/* <Carousel className="w-1/2" Component={OtherDeals} /> */}
        <div className="flex-[1] min-w-1/2 max-w-1/2">
          {books.length > 1 ? <OtherDeals books={books.slice(1)} /> : null}
        </div>
      </div>
    </div>
  );
}
