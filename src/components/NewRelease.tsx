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
import { Check, ShoppingCart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, removeBook } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";
import { addOrRemoveBookFromCart } from "../utils/cart";
import Book from "../pages/Book";
import BookCard from "./BookCard";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export default function NewRelease() {
  const [books, setBooks] = useState<any>([]);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

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
    <div className="mt-[6rem]" id="new-release">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-left mb-7">NEW RELEASE</h2>
      </div>
      <div className="h-[1px] bg-zinc-300 mb-12"></div>
      {/* Cards here */}

      <div className="flex flex-col lg:flex-row items-center justify-center overflow-hidden gap-5 px-10">
        {books && books[0] && (
          <a
            key={books[0]?._id}
            href="#"
            className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 w-full lg:w-1/2 h-[500px]"
          >
            <img
              className="object-cover w-full md:w-1/3 rounded-t-lg h-1/2 mr-3"
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

              <Button
                className="flex w-[150px] rounded-full mt-4 bg-pink-400"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addOrRemoveBookFromCart(
                      books[0],
                      cart.items.map((i) => i.book)
                    )
                  );
                }}
              >
                {cart?.items?.some((item) => item?.book?._id == books[0]?._id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </Button>
            </div>
          </a>
        )}

        {/* other deals */}
        <Carousel className="w-full lg:w-1/2">
          <CarouselContent>
            {books.length > 1
              ? books.slice(1).map((book: Book, index: number) => (
                  <CarouselItem key={index} className="basis-auto">
                    <BookCard book={book} direction="vertical" />
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
