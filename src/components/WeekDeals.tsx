import { forwardRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
type Props = {
  prevClick: () => void;
  nextClick: () => void;
};

const OtherDeals = () => {
  const [deals, setDeals] = useState<any>([1, 2, 3, 4]);
  return (
    <Carousel className="w-1/2">
      <CarouselContent className="grid grid-rows-2 grid-flow-col gap-8">
        {Array.from({ length: 5 }).map((deal: any, index: number) => (
          <CarouselItem key={index} className="min-w-80">
            <div className=" flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 shrink-0 w-full">
              <img
                className="object-cover w-full rounded-t-lg h-full  md:w-48 md:rounded-none md:rounded-s-lg"
                src=""
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Book title
                </h5>
                <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                  Book author
                </p>
                <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                  Book date | category
                </p>

                <h2 className="text-2xl">Book cost</h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-full translate-y-1/2 translate-x-2 border border-pink-400 hover:bg-pink-400" />
      <CarouselNext className="left-full -translate-y-1/2 translate-x-2 border border-pink-400 hover:bg-pink-400" />
    </Carousel>
  );
};
export default function WeekDeals() {
  return (
    <div className="mt-[6rem]">
      <h2 className="font-semibold text-xl text-left mb-7">
        DEALS OF THE WEEK
      </h2>
      <div className="h-[1px] bg-zinc-300 mb-12"></div>
      {/* Cards here */}
      <div className="flex justify-end mb-8">
        <span className="font-bold mx-2">3</span> Days |
        <span className="font-bold mx-2">10</span> Hours |
        <span className="font-bold mx-2">15</span> Minutes |
        <span className="font-bold mx-2">54</span> Seconds
      </div>

      <div className="flex items-end justify-center overflow-hidden gap-20 h-[400px]">
        <a
          href="#"
          className="flex grow-0 w-1/3  flex-col items-start bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 h-3/4 relative"
        >
          <img
            className="object-cover w-[250px] rounded-t-lg h-[200px] absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            src=""
            alt=""
          />
          <div className="h-[200px]"></div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
              Book title
            </h5>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left">
              Book author
            </p>

            <h2 className="text-2xl text-left">Book cost</h2>
            <div className="flex justify-between">
              <div>Already Sold: 20</div>
              <div>Available: 6</div>
            </div>
            {/* Progression */}
            <div className="h-5 rounded-full bg-zinc-300 relative overflow-hidden">
              <div className="absolute top-0 bottom-0 w-1/2 bg-pink-500 rounded-full"></div>
            </div>
          </div>
        </a>
        {/* other deals */}
        {/* <Carousel className="w-1/2" Component={OtherDeals} /> */}
        <OtherDeals />
      </div>
    </div>
  );
}
