import { Grip, List, Menu, Play, Search, ShoppingCart } from "lucide-react";
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
import { useEffect, useRef, useState } from "react";
import CartButton from "../components/CartButton";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import DualThumbSlider from "../components/DualThumbSlider";
import { Ratings } from "../components/Rating";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

type SideFilterProps = {
  categories: {
    name: string;
    id: string;
  }[];
  authors: Author[];
};

type FilterSheetProps = {
  categories: {
    name: string;
    id: string;
  }[];
  authors: Author[];
};

const FormSchema = z.object({
  categories: z.array(z.string()),
  authors: z.array(z.string()),
  minPrice: z.number(),
  maxPrice: z.number(),
  ratings: z.number(),
});

const FilterSheet = ({ categories, authors }: FilterSheetProps) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [threshold, setThreshold] = useState(10000000);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

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
        <div className="flex-col px-3 rounded-2xl min-w-56 flex mt-3">
          <form className="relative w-full">
            <Input
              placeholder="Books by keyword"
              className="bg-white/80 rounded-full w-full pr-14 focus:border-zinc-500 focus:ring-0 focus:outline-none"
            />
            <Button
              variant="ghost"
              className="bg-pink-400 px-5 rounded-full absolute top-0 right-0"
            >
              <Search />
            </Button>
          </form>
          <form className="">
            <h4 className="font-semibold text-2xl text-left mt-5">
              Categories
            </h4>
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
            <h4 className="font-semibold text-2xl text-left">Authors</h4>
            {/* Authors here */}
            {authors.length > 0
              ? authors.map((author: Author) => (
                  <div className="flex gap-5 items-center ml-5 mt-3">
                    <Label
                      htmlFor="fiction"
                      className="mr-auto text-lg text-neutral-600"
                    >
                      {author.fullName}
                    </Label>
                    <Checkbox id="fiction" />
                  </div>
                ))
              : null}

            <Separator className="my-8 h-[3px]" />
            <h4 className="font-semibold text-2xl text-left">Price</h4>
            {/* <Slider
              defaultValue={[0, 100]}
              onValueChange={(values) => setMinMaxPrice(values)}
            /> */}
            <DualThumbSlider
              defaultValue={[0, 200000]}
              max={threshold}
              value={[minPrice, maxPrice]}
              onValueChange={(values) => {
                setMinPrice(values[0]);
                setMaxPrice(values[1]);
              }}
              className="mt-10"
            />
            <Separator className="mt-16 mb-10 h-[3px]" />

            <h4 className="font-semibold text-2xl text-left">Ratings</h4>

            <RadioGroup className="flex flex-col gap-5 ml-5 mt-3">
              <div className="flex gap-5 items-center ml-5 mt-3">
                <Label
                  htmlFor="rating5"
                  className="mr-auto text-lg text-neutral-600"
                >
                  <Ratings rating={5} />
                </Label>
                <RadioGroupItem value="5" id="rating5" />
              </div>
              <div className="flex gap-5 items-center ml-5 mt-3">
                <Label
                  htmlFor="rating4"
                  className="mr-auto text-lg text-neutral-600"
                >
                  <Ratings rating={4} />
                </Label>
                <RadioGroupItem value="4" id="rating4" />
              </div>
              <div className="flex gap-5 items-center ml-5 mt-3">
                <Label
                  htmlFor="rating3"
                  className="mr-auto text-lg text-neutral-600"
                >
                  <Ratings rating={3} />
                </Label>
                <RadioGroupItem value="3" id="rating3" />
              </div>
              <div className="flex gap-5 items-center ml-5 mt-3">
                <Label
                  htmlFor="rating2"
                  className="mr-auto text-lg text-neutral-600"
                >
                  <Ratings rating={2} />
                </Label>
                <RadioGroupItem value="2" id="rating2" />
              </div>
              <div className="flex gap-5 items-center ml-5 mt-3">
                <Label
                  htmlFor="rating5"
                  className="mr-auto text-lg text-neutral-600"
                >
                  <Ratings rating={1} />
                </Label>
                <RadioGroupItem value="1" id="rating1" />
              </div>
            </RadioGroup>
          </form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="mt-10">
              Filter
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const SideFilter = ({ categories, authors }: SideFilterProps) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [threshold, setThreshold] = useState(10000000);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex-col bg-zinc-100 p-8 rounded-2xl min-w-56 hidden lg:flex">
      <form className="relative w-full">
        <Input
          placeholder="Books by keyword"
          className="bg-white/80 rounded-full w-full pr-14 focus:border-zinc-500 focus:ring-0 focus:outline-none"
        />
        <Button
          variant="ghost"
          className="bg-pink-400 px-5 rounded-full absolute top-0 right-0"
        >
          <Search />
        </Button>
      </form>
      {/*  */}

      {/*  */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h4 className="font-semibold text-2xl text-left mt-5">Categories</h4>
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                {categories.map((cat) => (
                  <FormField
                    key={cat.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={cat.id}
                          className="flex flex-row items-start space-x-3 space-y-0 w-full"
                        >
                          <FormLabel className="font-normal mr-auto">
                            {cat.name}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(cat.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, cat.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== cat.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <h4 className="font-semibold text-2xl text-left">Authors</h4>
          <FormField
            control={form.control}
            name="authors"
            render={() => (
              <FormItem>
                {authors.map((author: Author) => (
                  <FormField
                    key={author.id}
                    control={form.control}
                    name="authors"
                    render={({ field }) => {
                      console.log(field, author);
                      return (
                        <FormItem
                          key={author.id}
                          className="flex flex-row items-start space-x-3 space-y-0 w-full"
                        >
                          <FormLabel className="font-normal mr-auto">
                            {author.fullName}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(author.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, author.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== author.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <h4 className="font-semibold text-2xl text-left">Price</h4>
          <FormField
            control={form.control}
            name="authors"
            render={() => (
              <FormItem>
                <DualThumbSlider
                  defaultValue={[0, 200000]}
                  max={threshold}
                  value={[minPrice, maxPrice]}
                  onValueChange={(values) => {
                    setMinPrice(values[0]);
                    setMaxPrice(values[1]);
                  }}
                  className="mt-10"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <h4 className="font-semibold text-2xl text-left pt-10">Ratings</h4>
          <FormField
            control={form.control}
            name="ratings"
            render={() => (
              <FormItem>
                <RadioGroup className="flex flex-col gap-5 ml-5 mt-3">
                  <div className="flex gap-5 items-center ml-5 mt-3">
                    <Label
                      htmlFor="rating5"
                      className="mr-auto text-lg text-neutral-600"
                    >
                      <Ratings rating={5} />
                    </Label>
                    <RadioGroupItem value="5" id="rating5" />
                  </div>
                  <div className="flex gap-5 items-center ml-5 mt-3">
                    <Label
                      htmlFor="rating4"
                      className="mr-auto text-lg text-neutral-600"
                    >
                      <Ratings rating={4} />
                    </Label>
                    <RadioGroupItem value="4" id="rating4" />
                  </div>
                  <div className="flex gap-5 items-center ml-5 mt-3">
                    <Label
                      htmlFor="rating3"
                      className="mr-auto text-lg text-neutral-600"
                    >
                      <Ratings rating={3} />
                    </Label>
                    <RadioGroupItem value="3" id="rating3" />
                  </div>
                  <div className="flex gap-5 items-center ml-5 mt-3">
                    <Label
                      htmlFor="rating2"
                      className="mr-auto text-lg text-neutral-600"
                    >
                      <Ratings rating={2} />
                    </Label>
                    <RadioGroupItem value="2" id="rating2" />
                  </div>
                  <div className="flex gap-5 items-center ml-5 mt-3">
                    <Label
                      htmlFor="rating5"
                      className="mr-auto text-lg text-neutral-600"
                    >
                      <Ratings rating={1} />
                    </Label>
                    <RadioGroupItem value="1" id="rating1" />
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
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
  const [authors, setAuthors] = useState<Author[]>([]);
  const [totalDocSize, setTotalDocSize] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [threshold, setThreshold] = useState(10000000);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isListView, setIsListView] = useState(false);
  const ref = useRef<HTMLSpanElement>();

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
    }
    async function fetchCategories() {
      const res = await fetch(`${BASE_URL}/api/v1/catalog/categories`);
      const { response } = await res.json();
      setCategories(response.data);
    }

    async function fetchAuthors() {
      const res = await fetch(
        `${BASE_URL}/api/v1/catalog/authors?page=0&size=6`
      );
      const { response } = await res.json();
      if (!res.ok) {
        console.error("Failed to fetch authors");
        return;
      }

      setAuthors(response.data);
    }

    async function fetchBooks() {
      const res = await fetch(
        `${BASE_URL}/api/v1/catalog/books-by-page?page=${searchParams.get(
          "page"
        )}`
      );
      const { response } = await res.json();
      setBooks(response.data ?? []);
      setTotalDocSize(response.totalBooks);
    }

    fetchBooks();
    fetchCategories();
    fetchAuthors();
  }, []);
  return (
    <div className="flex min-h-screen my-10 gap-10">
      <div className="shrink-0">
        <SideFilter categories={categories} authors={authors} />
      </div>

      <div className="grow overflow-hidden">
        <div className="flex py-5 px-6 rounded-3xl bg-zinc-100 w-full justify-between items-center">
          <div>
            {/* <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="rounded-full lg:hidden">
                  <Menu className="scale-125" />
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet> */}
            <FilterSheet categories={categories} authors={authors} />
          </div>

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
