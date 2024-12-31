import { Button } from "./ui/button";
import { ShoppingCart, Trash } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Input } from "./ui/input";

function Navbar() {
  return (
    <div className=" flex justify-between items-center w-full">
      <div className="navbar-start">
        <a className="btn btn-ghost text-3xl">Booktopia</a>
      </div>
      <div className="navbar-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <ShoppingCart />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Booktopia Cart</SheetTitle>
              <SheetDescription>
                Should you choose more? Good deals await
              </SheetDescription>
              <SheetDescription>
                You currently have 3 items in your cart
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col">
              <div className="flex items-center h-[100px]">
                <img src="/sale_off.png" className="object-cover h-full" />
                <div>
                  <h3>Book Title</h3>
                  <p>Author Name</p>
                </div>

                <Input type="number" min="1" className="w-[80px] ml-auto" />
                <div className="ml-2">Cost</div>
                <Button variant="destructive" className="ml-3">
                  <Trash color={"white"} />
                </Button>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Checkout</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navbar;
