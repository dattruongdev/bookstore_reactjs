import { Grip, List, Menu, Play } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useEffect, useState } from "react";
import CartButton from "../components/CartButton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../components/ui/pagination";
import { useLocation, useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../components/ui/sheet";
import FilterForm from "../components/FilterForm";
import SearchInputFilter from "../components/SearchInputFilter";
import { mapApiResponseToBook } from "../utils/mapper";
import { fetchAuthors, fetchBooksInPage, fetchCategories } from "../api";
import { useAuth } from "../hooks/use-auth";

type Props = {
  books: any[];
};

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

const ListScrollArea = ({ books }: Props) => {
  return (
    <div className="w-full mt-10">
      {books.length > 0
        ? books.map((book: any) => (
            <a
              href="#"
              className="flex items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mb-10"
            >
              <img
                className="object-cover w-full rounded-t-lg h-full md:w-48 md:rounded-none md:rounded-s-lg"
                src={book?.imageUrl}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal w-full">
                <div className="flex justify-between">
                  <span>
                    {book?.categories[0]?.name}{" "}
                    {book?.categories?.length > 1
                      ? book?.categories
                          .splice(1)
                          .map((cat: any) => " | " + cat.name)
                      : null}
                  </span>
                  <span>Rating</span>
                </div>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
                  {book?.title}
                </h5>
                <div className="flex justify-between items-center">
                  <p className="flex-[2] text-left">
                    {book.description.slice(0, 300)}...
                  </p>
                  <p className="flex-[1] text-pink-400 text-2xl text-bold text-right">
                    {book?.bookPricing?.cost.amount.toLocaleString("it-IT", {
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
                        {book.authors[0].fullName +
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
                    <CartButton book={book} />
                    <a className="text-pink-400 text-md flex items-center">
                      | More <Play color="pink" />
                    </a>
                  </div>
                </div>
              </div>
            </a>
          ))
        : null}
    </div>
  );
};

const GridScrollArea = ({ books }: Props) => {
  console.log("BOOKS IN GRID Scroll", books);
  return (
    <div className="w-full mt-10">
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-10 justify-center p-10">
        {books.length > 0
          ? books.map((book: Book) => (
              <BookCard book={book} direction="vertical" />
            ))
          : null}
      </div>
    </div>
  );
};

type FilterProps = {
  categories: {
    name: string;
    id: string;
  }[];
  authors: Author[];
  modifyBooks: (books: Book[]) => void;
};

const FilterSheet = ({ categories, authors, modifyBooks }: FilterProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="rounded-full lg:hidden">
          <Menu className="scale-125" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>Choose filter for your preference</SheetDescription>
        </SheetHeader>
        <FilterForm
          categories={categories}
          authors={authors}
          onFilter={(books) => modifyBooks(books)}
        />
      </SheetContent>
    </Sheet>
  );
};

const SideFilter = ({ categories, authors, modifyBooks }: FilterProps) => {
  return (
    <div className="flex-col bg-zinc-100 p-8 rounded-2xl min-w-56 hidden lg:flex">
      <SearchInputFilter onSearch={(books) => modifyBooks(books)} />
      <FilterForm
        categories={categories}
        authors={authors}
        onFilter={(books) => modifyBooks(books)}
      />
    </div>
  );
};

export default function Books() {
  const [methods, setMethods] = useState<any>({
    titleasc: () => {
      setBooks((books: Book[]) =>
        books.sort((a, b) => a.title.localeCompare(b.title))
      );
    },
    titledesc: () => {
      setBooks((books: Book[]) =>
        books.sort((a, b) => b.title.localeCompare(a.title))
      );
    },
    authorasc: () => {
      setBooks((books: Book[]) =>
        books.sort((a, b) =>
          a.authors[0].fullName.localeCompare(b.authors[0].fullName)
        )
      );
    },
    authordesc: () => {
      setBooks((books: Book[]) =>
        books.sort((a, b) =>
          b.authors[0].fullName.localeCompare(a.authors[0].fullName)
        )
      );
    },
    yearasc: () => {
      setBooks((books: Book[]) =>
        books.sort((a, b) => a.publishedDate.localeCompare(b.publishedDate))
      );
    },
    yeardesc: () => {
      setBooks((books: Book[]) =>
        books.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
      );
    },
  });
  const [direction, setDirection] = useState("asc");
  const { state } = useLocation();
  const [books, setBooks] = useState<any>(state?.books ?? []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [totalDocSize, setTotalDocSize] = useState(state?.totalDocSize ?? 0);
  const { token } = useAuth();

  const [searchParams, _] = useSearchParams();
  const [isListView, setIsListView] = useState(false);

  console.log("totalDocSize", totalDocSize);

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
    }

    if (!token) return;
    fetchBooksInPage(searchParams.get("page") as unknown as number).then(
      ({ books, docSize }) => {
        setBooks(books);
        setTotalDocSize(docSize);
      }
    );

    fetchCategories().then((categories) => setCategories(categories));
    fetchAuthors().then((authors) => setAuthors(authors));
  }, [token]);
  return (
    <div className="flex min-h-screen my-10 gap-10">
      <div className="shrink-0">
        <SideFilter
          categories={categories}
          authors={authors}
          modifyBooks={(books) => setBooks(books)}
        />
      </div>

      <div className="grow overflow-hidden">
        <div className="flex py-5 px-6 rounded-3xl bg-zinc-100 w-full justify-between items-center">
          <div>
            <FilterSheet
              categories={categories}
              authors={authors}
              modifyBooks={(books) => setBooks(books)}
            />
          </div>

          <div className="flex items-center gap-5">
            <Select onValueChange={(value) => methods[value + direction]()}>
              <SelectTrigger className="border-2 border-b-black bg-white/60">
                <SelectValue placeholder="Default sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="author">Author</SelectItem>
                <SelectItem value="year">Year</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
            <Select
              defaultValue="asc"
              value={direction}
              onValueChange={(value) => setDirection(value)}
            >
              <SelectTrigger className="border-2 border-b-black bg-white/60">
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc" onClick={() => {}}>
                  ASC
                </SelectItem>
                <SelectItem value="desc" onClick={() => {}}>
                  DESC
                </SelectItem>
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

        <div className="w-full">
          <Pagination className="mt-8 w-full">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page${Number(searchParams.get("page")) - 1}`}
                  size={undefined}
                  className="w-auto pr-3"
                />
              </PaginationItem>

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
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  size={undefined}
                  className="w-auto pl-3"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
