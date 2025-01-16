import React, { useEffect, useState } from "react";
import { Ratings } from "../components/Rating";
import { Separator } from "../components/ui/separator";
import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { CommentRatings } from "../components/CommentRatings";
import { Textarea } from "../components/ui/textarea";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { mapApiResponseToBook } from "../utils/mapper";
import BookCard from "../components/BookCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import ScrollToTop from "../components/ScrollToTop";
import CartButton from "../components/CartButton";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Book() {
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const { state } = useLocation();
  const [page, setPage] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const book: Book = state?.book;
  console.log("BOOK:", book);

  async function fetchNextReviews() {
    const res = await fetch(
      `${BASE_URL}/api/v1/catalog/${book._id}/reviews?page=${page + 1}&size=6`
    );
    if (!res.ok) {
      return;
    }

    const { response } = await res.json();

    const data = response.data;

    setReviews([...reviews, ...data]);
    setPage(page + 1);
  }

  useEffect(() => {
    async function fetchRelatedBooks() {
      console.log(
        book?.authors.map((author, index) => {
          console.log((index ? ", " : "") + author.fullName);
        })
      );
      const res = await fetch(
        `${BASE_URL}/api/v1/catalog/related-books?bookId=${
          book._id
        }&categories=${book?.categories.map((cat, index) =>
          index ? "," + cat.id : cat.id
        )}`
      );
      if (!res.ok) {
        return;
      }

      const { response } = await res.json();

      const data = response.data;

      setRelatedBooks(data.map((book: Book) => mapApiResponseToBook(book)));
    }

    if (book && book.categories) fetchRelatedBooks();
  }, [book]);

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(
        `${BASE_URL}/api/v1/catalog/${book._id}/reviews?page=${page}&size=6`
      );
      if (!res.ok) {
        return;
      }

      const { response } = await res.json();

      const data = response.data;

      setReviews(data);
      setTotalReviews(response.totalInBook);
    }

    if (book) fetchReviews();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch(
      `${BASE_URL}/api/v1/catalog/${book._id}/reviews/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          name,
          email,
          content: review,
          bookId: book._id,
        }),
      }
    );

    if (!res.ok) {
      console.error("Failed to submit review");
      return;
    }

    const { response } = await res.json();
    const data = response.data;
    setReviews([data, ...reviews]);
    setTotalReviews(totalReviews + 1);
    setName("");
    setEmail("");
    setReview("");
    setRating(0);
  }

  return (
    <div className="min-w-[80%] mt-10">
      <ScrollToTop />
      <div className="flex grow w-[90%] m-auto gap-6">
        {/* Images */}
        <div
          className="flex-[1] rounded-xl"
          style={{
            backgroundImage: `url(${book?.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Book info */}
        <div className="flex-[2] text-left">
          <div className="categories flex justify-between items-center">
            <div className="text-pink-400">
              {/* {...book?.categories?.map((cat) => cat.name)} */}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span>{book?.rating.toFixed(1)}</span>
                <Ratings rating={book?.rating} />
              </div>
              <div>{totalReviews} reviews</div>
            </div>
          </div>

          <div className="title text-lg font-semibold mb-5">{book?.title}</div>
          <div className="flex items-center gap-5">
            <div>
              <p className="text-zinc-500 text-sm mb-1">Author</p>
              <p className="font-semibold">{book?.authors[0].fullName}</p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm mb-1">Year</p>
              <p className="font-semibold">
                {book?.publishedDate.substring(0, 4)}
              </p>
            </div>

            <div className="ml-auto">Available: {book?.numberOfCopies}</div>
          </div>

          <Separator color="grey" className="my-5" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-xl text-pink-400 ">
                {book?.bookPricing?.cost.amount == 0
                  ? "Free"
                  : book?.bookPricing?.cost.amount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
              </p>
              {book?.bookPricing?.discount > 0 && (
                <p className="text-zinc-400 line-through">
                  {book?.bookPricing?.originalCost.amount == 0
                    ? "Free"
                    : book?.bookPricing?.originalCost.amount.toLocaleString(
                        "it-IT",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                </p>
              )}
            </div>

            <CartButton book={book} />
          </div>
        </div>
      </div>
      <Tabs
        defaultValue="description"
        className="w-[90%] min-h-[500px] mx-auto my-20 bg-[#f8f8f8] p-10 rounded-lg overflow-hidden"
      >
        <TabsList className="grid w-1/2 grid-cols-3 m-auto">
          <TabsTrigger value="description" className="text-xl">
            Description
          </TabsTrigger>
          <TabsTrigger value="product" className="text-xl">
            Product
          </TabsTrigger>
          <TabsTrigger value="review" className="text-xl">
            Review
          </TabsTrigger>
        </TabsList>
        <Separator
          color="#333"
          className="my-8 h-[2px] rounded-full w-[80%] mx-auto"
        />
        <TabsContent
          value="description"
          defaultValue={"description"}
          className="text-left w-[80%] mx-auto"
        >
          <div className="mt-12">{book?.description}</div>
          <div className="mt-12 font-semibold">
            {book?.authors[0]?.fullName}
          </div>
        </TabsContent>
        <TabsContent value="product" className="text-left w-[80%] mx-auto">
          <div className="mt-12">
            <table>
              <tbody>
                {/* add book format: and value is Paperback horizontally */}
                <tr>
                  <td className="p-5 font-semibold">Format:</td>
                  <td className="p-5 text-zinc-500">Paperback</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold">Dimension:</td>
                  <td className="p-5 text-zinc-500">
                    126mm x 194mm x 28mm | 300g
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold">Publication date:</td>
                  <td className="p-5 text-zinc-500">
                    {new Date(book?.publishedDate).toDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="review" className="text-left w-[80%] mx-auto">
          <div className="flex">
            {/* Reviews */}
            <div
              className="flex flex-col flex-[1] max-h-[400px] overflow-auto"
              id="scrollableDiv"
            >
              <InfiniteScroll
                next={fetchNextReviews}
                dataLength={reviews.length}
                hasMore={!(reviews.length >= totalReviews)}
                loader={
                  <h4 className="animate-spin">
                    <Loader2 className="animate-spin" />
                  </h4>
                }
                scrollableTarget="scrollableDiv"
                pullDownToRefresh
                refreshFunction={() => window.location.reload()}
                scrollThreshold={0.9}
                // className="h-[350px]"
              >
                {reviews.map((review) => (
                  <div className="mt-8">
                    <div className="mb-5">
                      <Ratings rating={review?.rating} />
                    </div>
                    <div className="mb-6">
                      <p>{review?.content}</p>
                    </div>

                    <h3 className="font-semibold">{review?.username}</h3>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
            {/* input review */}
            <form className="flex flex-col flex-[1]" onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td className="p-5">
                      <Label>Rating</Label>
                    </td>
                    <td>
                      <CommentRatings
                        rating={0}
                        onRatingChange={(e) => setRating(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5">
                      <Label>Name:</Label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5">
                      <Label>Email:</Label>
                    </td>
                    <td>
                      <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5">
                      <Label>Review:</Label>
                    </td>
                    <td>
                      <Textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review here"
                      />
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td className="py-5">
                      <Button
                        type="submit"
                        className="bg-pink-400 rounded-full px-10"
                      >
                        Submit
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </form>
          </div>
        </TabsContent>
      </Tabs>

      {relatedBooks.length > 0 ? (
        <div className="p-10">
          <h2 className="text-2xl font-semibold text-center my-10">
            Related Books
          </h2>

          <Carousel className="w-full">
            <CarouselContent className="items-center gap-5">
              {relatedBooks.map((book: Book) => (
                <CarouselItem className="max-w-[400px]">
                  <BookCard book={book} direction="horizontal" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-full translate-y-1/2 translate-x-2 border border-pink-400 hover:bg-pink-400" />
            <CarouselNext className="left-full -translate-y-1/2 translate-x-2 border border-pink-400 hover:bg-pink-400" />
          </Carousel>
        </div>
      ) : null}
    </div>
  );
}
