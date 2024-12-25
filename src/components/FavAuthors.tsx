import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

export default function FavAuthors() {
  const [data, setData] = useState<any>([1, 2, 3, 4, 5]);
  return (
    <div className="mt-[6rem]">
      <h2 className="font-semibold text-xl text-left mb-7">FAVORITE AUTHORS</h2>
      <div className="h-[1px] bg-zinc-300 mb-12"></div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-5/6 m-auto"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
              <div className="p-1">
                <div className="flex flex-col bg-[#2d276e] min-h-56 min-w-44 rounded-xl">
                  <h3 className="text-white mt-3">Author's name</h3>
                  <h4 className="text-white">52 books</h4>
                  <img src="" alt="" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
