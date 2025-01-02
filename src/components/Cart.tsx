import { ShoppingCart, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";
import { useMemo } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useDispatch } from "react-redux";
import { removeBook } from "../redux/slices/cartSlice";
import { cn } from "../lib/utils";

type CartProps = {
  books: Book[];
};

export default function Cart({ books }: CartProps) {
  const dispatch = useDispatch();

  let value = useMemo(
    () =>
      books.reduce(
        (acc, cur) => (acc += Number(cur?.bookPricing?.cost.amount ?? 0)),
        0
      ),
    [books]
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"}>
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex-[1]">
          <SheetTitle>Booktopia Cart</SheetTitle>
          {books.length > 0 ? (
            <>
              <SheetDescription>
                Should you choose more? Good deals await
              </SheetDescription>
              <SheetDescription>
                You currently have {books?.length} items in your cart
              </SheetDescription>
            </>
          ) : null}
        </SheetHeader>
        <div className="flex-[7] rounded-md border flex flex-col justify-center items-center overflow-hidden">
          <ScrollArea
            className={cn("w-full px-5", books.length > 0 ? "mb-auto" : "")}
          >
            {books.length > 0 ? (
              books.map((book: Book) => (
                <div className="flex items-center h-[100px] mb-3">
                  <img src="/sale_off.png" className="object-cover h-2/3" />
                  <div>
                    <h3 className="text-xs">{book?.title}</h3>
                    <p>
                      {(book?.authors[0]?.fullName ?? "Unknown") &&
                      book?.authors?.length > 1
                        ? " and the others"
                        : ""}
                    </p>
                  </div>

                  <Input type="number" min="1" className="w-[60px] ml-auto" />
                  <div className="ml-3">
                    {book?.bookPricing?.cost.amount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                  <Button
                    variant="destructive"
                    className="ml-3 w-[20px] h-[30px]"
                    onClick={() => dispatch(removeBook(book))}
                  >
                    <Trash color={"white"} />
                  </Button>
                </div>
                // <div className="flex flex-col shrink-0">

                // </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center grow">
                <p className="text-lg">Looks like have no items in your cart</p>
                <p>
                  Buy your favorite books{" "}
                  <Button variant="destructive">here</Button>
                </p>
                <div className="flex justify-center items-center mt-5">
                  <img src="/book-stack.png" className="w-1/2 " />
                </div>
              </div>
            )}

            {/* <div className="p-4 flex flex-col justify-center items-center"></div> */}
          </ScrollArea>
        </div>

        {/* <div className="flex-[3] shrink-0 overflow-y-scroll">
        </div> */}
        <SheetFooter className="flex-[1]">
          <SheetClose asChild>
            <div className="w-full flex flex-col">
              <div className="flex">
                <p className="text-right flex-[2] shrink-0 font-semibold">
                  Total:
                </p>
                <p className="text-right flex-[1] shrink-0">
                  {value.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}{" "}
                </p>
              </div>
              <Button
                type="submit"
                disabled={books.length == 0}
                className="self-end mt-3"
              >
                Checkout
              </Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
