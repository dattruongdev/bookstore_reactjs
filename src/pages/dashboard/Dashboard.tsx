import { Dot, Loader2, Star } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "../../components/ui/button";
import { DataTable as BorrowTable } from "./borrow-table";
import { cols as borrow_cols } from "./borrow-column";
import { useEffect, useState } from "react";
import { DataTable as BuyTable } from "./buy-table";
import { cols as buy_cols } from "./buy-column";
import { fetchBookSales, fetchBorrowedBooks } from "../../api";
import { useAuth } from "../../hooks/use-auth";

export default function Dashboard() {
  const [borrowData, setBorrowData] = useState<Borrow[]>([]);
  const [borrowPage, setBorrowPage] = useState<number>(0);
  const [buyData, setBuyData] = useState<Buy[]>([]);
  const [buyPage, setBuyPage] = useState<number>(0);
  const { user, token } = useAuth();

  console.log(borrowData, buyData);

  useEffect(() => {
    if (!token || !user) {
      return;
    }

    fetchBookSales(buyPage, token).then((data) => setBuyData(data));

    fetchBorrowedBooks(borrowPage, token).then((data) => setBorrowData(data));
  }, [token]);

  return (
    <div className="mt-20 min-h-screen border-t-2 w-full">
      <div className="flex items-center gap-10 h-[130px]">
        <div className="w-[130px] relative self-start">
          <div className="absolute  w-[100px] h-[100px] left-1/2 -translate-x-1/2 -translate-y-1/3 z-[1] bg-white rounded-full shadow-md flex items-center justify-center">
            <img
              className="w-[95%] h-[95%] rounded-full"
              src={`/defaultavatar.jpg`}
            />
          </div>
        </div>

        <div className="flex-[1] grow flex flex-col text-left">
          <div className="font-semibold text-2xl mt-5">User name </div>
          <div className="">Some info about the user</div>
          <div className="mt-5 flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                className={cn(
                  "w-[30px] h-[30px] rounded-full flex items-center justify-center float-start overflow-hidden"
                )}
                style={{ transform: `translateX(-${i * 15}px)`, zIndex: i }}
              >
                <img
                  src={`/defaultavatar.jpg`}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-[1] grow flex flex-col justify-end items-start">
          <div className="flex gap-5 items-center mt-7">
            <Dot />
            <div>View profile</div>
            <div>Follow +</div>
          </div>

          <div className="flex mt-auto gap-3">
            <div className="text-left">
              <p className="text-nowrap text-sm">Borrowed</p>
              <p>15</p>
            </div>
            <div className="text-left">
              <p className="text-nowrap text-sm">Bought</p>
              <p>20</p>
            </div>
            <div className="text-left">
              <p className="text-nowrap text-sm">Comments</p>
              <p>100</p>
            </div>
          </div>
        </div>
      </div>

      {/* tabs */}
      <Tabs
        defaultValue="activities"
        className="w-[90%] min-h-[500px] mx-auto my-20 bg-[#f8f8f8] p-10 rounded-lg overflow-hidden"
      >
        <TabsList className="grid w-1/3 grid-cols-3 border-b-2">
          <TabsTrigger
            value="activities"
            className="text-xl data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Activities
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="text-xl data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="requests"
            className="text-xl data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Requests
          </TabsTrigger>
        </TabsList>
        <Separator
          color="#333"
          className="my-8 h-[2px] rounded-full w-[80%] mx-auto"
        />
        <TabsContent
          value="activities"
          defaultValue={"description"}
          className="text-left mx-auto"
        >
          <div className="flex justify-start items-center">
            <div className="w-1/3">
              <div className="flex flex-col w-[70%] h-[80%] items-start gap-5">
                <div className="font-semibold">Books Borrowed</div>
                <p>
                  This section shows how many books you have borrowed. More like
                  a progress and timeline of you for our store
                </p>
                <span>
                  <Button variant={"destructive"} className="mr-2">
                    Borrow more
                  </Button>
                  to enhance your knowledge
                </span>
              </div>
            </div>

            <div className="w-2/3">
              {borrowData.length > 0 ? (
                <BorrowTable columns={borrow_cols} data={borrowData} />
              ) : (
                <Loader2 className="animate-spin" />
              )}
            </div>
          </div>
          <div className="flex justify-start items-center mt-10">
            <div className="w-2/3">
              {buyData.length > 0 ? (
                <BuyTable columns={buy_cols} data={buyData} />
              ) : (
                <Loader2 className="animate-spin" />
              )}
            </div>
            <div className="w-1/3">
              <div className="flex flex-col w-[70%] h-[80%] items-center gap-5 m-auto">
                <div className="font-semibold">Books bought</div>
                <p>
                  This section shows how many books you have bought. The books
                  you bought will help guide you all the way to your goal.
                </p>
                <span>
                  <Button variant={"default"} className="mr-2 bg-pink-400">
                    Buy more
                  </Button>
                  to make our store better
                </span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="text-left w-[80%] mx-auto">
          <div className="mt-12">All Settings here</div>
        </TabsContent>
        <TabsContent value="requests" className="text-left w-[80%] mx-auto">
          <div className="flex">All request here</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
