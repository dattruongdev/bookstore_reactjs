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
import { ScrollArea } from "./ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { modifyQuantity, removeBook } from "../redux/slices/cartSlice";
import { cn } from "../lib/utils";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart);
  const items = cart.items;

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
          {items.length > 0 ? (
            <>
              <SheetDescription>
                Should you choose more? Good deals await
              </SheetDescription>
              <SheetDescription>
                You currently have {items?.length} items in your cart
              </SheetDescription>
            </>
          ) : null}
        </SheetHeader>
        <div className="flex-[7] rounded-md border flex flex-col justify-center items-center overflow-hidden">
          <ScrollArea
            className={cn("w-full px-5", items.length > 0 ? "mb-auto" : "")}
          >
            {items.length > 0 ? (
              items.map((item) => (
                <div className="flex items-center h-[100px] mb-3 gap-5">
                  <div className="flex items-center w-1/2 h-[90%]">
                    <img
                      src={item?.book?.imageUrl}
                      className="object-cover w-full h-full rounded-lg mr-2 flex-[1]"
                    />
                    <div className="flex-[2]">
                      <h3 className="text-xs font-semibold">
                        {item?.book?.title}
                      </h3>
                      <p className="text-xs">
                        {(item?.book?.authors[0]?.fullName ?? "Unknown") +
                          (item?.book?.authors?.length > 1
                            ? " and the others"
                            : "")}
                      </p>
                    </div>
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {item?.method == "buy" ? (
                              <img src={"/buy.png"} className="w-[15px]" />
                            ) : (
                              <img src={"/borrow.png"} className="w-[15px]" />
                            )}
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-black rounded-lg p-1 text-xs"
                          >
                            {item?.method == "buy" ? (
                              <p className="text-white">Buy</p>
                            ) : (
                              <p className="text-white">Borrow</p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div className="flex items-center w-1/2 grow-0 shrink-0">
                    <Input
                      type="number"
                      // value={1}
                      value={item?.book?.quantity}
                      defaultValue={1}
                      min="1"
                      max={item?.book?.numberOfCopies}
                      className="w-[60px] self-start mr-auto"
                      onChange={(e) => {
                        const el = e.target as HTMLInputElement;

                        if (parseInt(el.value) < 1) {
                          el.value = el.min;
                        }
                        if (isNaN(parseInt(el.value))) {
                          el.value = el.min;
                        }
                        dispatch(
                          modifyQuantity({
                            bookId: item?.book?._id,
                            quantity: parseInt(el.value),
                          })
                        );
                      }}
                    />
                    <div className="ml-3">
                      {item?.costForMethod &&
                        item?.book?.quantity &&
                        (
                          item.costForMethod * item.book.quantity
                        ).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </div>
                    <Button
                      variant="destructive"
                      className="ml-3 w-[20px] h-[30px]"
                      onClick={() => dispatch(removeBook(item.book))}
                    >
                      <Trash color={"white"} />
                    </Button>
                  </div>
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
                  {cart.totalPrice == undefined
                    ? 0 + " VND"
                    : cart.totalPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                </p>
              </div>
              <Button
                disabled={items.length == 0}
                className="self-end mt-3"
                onClick={() =>
                  navigate("/books/payment", { state: cart.items })
                }
              >
                Go to payment
              </Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
