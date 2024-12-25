import { forwardRef, Ref, useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
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

const TopFeedbacks = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState<any>([1, 2, 3, 4]);
  return (
    <Carousel className="bg-white h-96 mt-10 flex flex-col justify-center">
      <CarouselContent className="gap-10">
        {feedbacks.length > 0
          ? feedbacks.map((fb: any, index: number) => (
              <CarouselItem key={index} className="basis-1/3">
                <div
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "flex  items-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100  max-w-4xl shrink-0 origin-bottom-left mt-auto h-64 shadow-lg w-96"
                    // index === selectedIndex ? "scale-110" : ""
                  )}
                >
                  <div className="flex flex-[2] flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white text-left">
                      I love the book collection in this store. I even found an
                      old book from my chilhood here.
                    </h5>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left">
                      Anita May
                    </p>
                  </div>
                  <img
                    className="object-cover flex-[1] rounded-t-lg h-full w-1/2"
                    src="defaultavatar.jpg"
                    alt=""
                  />
                </div>
              </CarouselItem>
            ))
          : null}
      </CarouselContent>
      <div className="absolute top-10 right-10 flex items-center">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default TopFeedbacks;
