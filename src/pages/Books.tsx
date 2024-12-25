import { Grip, List, Play, Search, ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import CartButton from "../components/CartButton";
import { set } from "react-hook-form";
import { Separator } from "../components/ui/separator";
import { Slider } from "../components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../components/ui/pagination";
import { useSearchParams } from "react-router-dom";

type Props = {
  books: any[];
};

const ListScrollArea = ({ books }: Props) => {
  return (
    <ScrollArea className="w-full h-[80%] mt-10">
      {books.length > 0
        ? books.map((book: any) => (
            <a
              href="#"
              className="flex items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mb-10"
            >
              <img
                className="object-cover w-full rounded-t-lg h-full md:w-48 md:rounded-none md:rounded-s-lg"
                src={book.imageUrl}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal w-full">
                <div className="flex justify-between">
                  <span>
                    {book.categories[0]?.name}{" "}
                    {book.categories?.length > 1
                      ? book.categories
                          .splice(1)
                          .map((cat: any) => " | " + cat.name)
                      : null}
                  </span>
                  <span>Rating</span>
                </div>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
                  {book.title}
                </h5>
                <div className="flex justify-between items-center">
                  <p className="flex-[2] text-left">
                    {book.description.slice(0, 300)}...
                  </p>
                  <p className="flex-[1] text-pink-400 text-2xl text-bold text-right">
                    {book.cost.amount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div>
                      <p className="text-left">Author</p>
                      <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left">
                        {book.authors[0] +
                          (book.authors.length > 1 ? " and others" : "")}
                      </p>
                    </div>
                    <div>
                      <p className="text-left">Year</p>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-left">
                        {book.publishedDate.substring(0, 4)} | {book.publisher}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <CartButton />
                    <a className="text-pink-400 text-md flex items-center">
                      | More <Play color="pink" />
                    </a>
                  </div>
                </div>
              </div>
            </a>
          ))
        : null}
    </ScrollArea>
  );
};

const GridScrollArea = ({ books }: Props) => {
  return (
    <ScrollArea className="w-full h-[80%] mt-10">
      <div className="grid grid-cols-3 gap-10">
        {books.length > 0
          ? books.map((book: any) => (
              <a
                href="#"
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100"
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
    </ScrollArea>
  );
};

export default function Books() {
  const [books, setBooks] = useState<any>([]);
  const [categories, setCategories] = useState<
    {
      name: string;
      id: string;
    }[]
  >([]);
  const [totalDocSize, setTotalDocSize] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isListView, setIsListView] = useState(false);

  console.log(books);
  console.log("doc size: ", totalDocSize);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        "http://localhost:8080/api/v1/catalog/categories"
      );
      const data = await response.json();
      setCategories(data.data.value ?? []);
    }

    async function fetchBooks() {
      const response = await fetch(
        `http://localhost:8080/api/v1/catalog/books-by-page?page=${searchParams.get(
          "page"
        )}`
      );
      const data = await response.json();
      setBooks(data.data.value ?? []);
      setTotalDocSize(data.data.docSize);
    }

    fetchBooks();
    fetchCategories();
  }, []);
  return (
    <div className="flex min-h-screen h-screen mt-10 gap-10">
      <div className="h-[80%] shrink-0">
        <div className="flex flex-col bg-zinc-100 p-8 rounded-2xl min-w-56 h-full">
          <div className="relative w-full">
            <Input
              placeholder="Books by keyword"
              className="bg-white/80 rounded-full w-full pr-14"
            />
            <Button
              variant="ghost"
              className="bg-pink-400 px-5 rounded-full absolute top-0 right-0"
            >
              <Search />
            </Button>
          </div>
          <h4 className="font-semibold text-2xl text-left mt-5">Categories</h4>
          {categories.length > 0
            ? categories.map((cat: { name: string; id: string }) => (
                <div className="flex gap-5 items-center ml-5 mt-3">
                  <Label
                    htmlFor="fiction"
                    className="mr-auto text-lg text-neutral-600"
                  >
                    {cat.name}
                  </Label>
                  <Checkbox id="fiction" />
                </div>
              ))
            : null}
          <Separator className="my-8 h-[3px]" />
          <h4 className="font-semibold text-2xl text-left">Author</h4>
          {/* Authors here */}
          <Separator className="my-8 h-[3px]" />
          <h4 className="font-semibold text-2xl text-left">Price</h4>
          <Slider defaultValue={[0, 100]} />
        </div>
      </div>

      <div className="grow overflow-hidden">
        <div className="flex py-5 px-6 rounded-3xl bg-zinc-100 w-full justify-between items-center">
          <p></p>
          <div className="flex items-center gap-5">
            <Select>
              <SelectTrigger className="border-2 border-b-black bg-white/60">
                <SelectValue placeholder="Default sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hello">HELLO</SelectItem>
                <SelectItem value="hello">HELLO</SelectItem>
                <SelectItem value="hello">HELLO</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="border-2 border-b-black bg-white/60">
                <SelectValue placeholder="Show all result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hello">HELLO</SelectItem>
                <SelectItem value="hello">HELLO</SelectItem>
                <SelectItem value="hello">HELLO</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" onClick={() => setIsListView(false)}>
              <Grip />
            </Button>
            <Button variant="ghost" onClick={() => setIsListView(true)}>
              <List />
            </Button>
          </div>
        </div>

        {isListView ? (
          <ListScrollArea books={books} />
        ) : (
          <GridScrollArea books={books} />
        )}
        <Pagination>
          <PaginationContent>
            {/* <PaginationItem>
              <PaginationPrevious href="#" size={undefined} />
            </PaginationItem> */}

            {Array.from({ length: Math.ceil(totalDocSize / 12) }).map(
              (_, i) => (
                <PaginationItem>
                  <PaginationLink
                    href={`?page=${i + 1}`}
                    isActive={Number(searchParams.get("page")) == i + 1}
                    size={undefined}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" size={undefined} />
            </PaginationItem> */}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
