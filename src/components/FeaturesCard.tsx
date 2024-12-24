import { Button } from "./ui/button";
import { Play } from "lucide-react";

export default function FeaturesCard({
  textA,
  textB,
}: {
  textA: string;
  textB: string;
}) {
  return (
    <div
      className="w-[200px] h-[200px] relative"
      style={{
        backgroundImage: "url(https://picsum.photos/id/24/300/200)",
      }}
    >
      <div
        className="bg-[#27036e] h-full absolute inset-0 z-0"
        style={{
          clipPath: "polygon(46% 0, 100% 0%, 100% 100%, 26% 100%)",
        }}
      ></div>
      <div className="absolute text-left text-2xl top-1/2 -translate-y-1/2 break-words z-[10] left-1/2">
        <div className="text-white">{textA}</div>
        <div className="text-white">{textB}</div>
        <Button
          variant="ghost"
          className="text-left text-[#834deb] p-0 text-lg"
        >
          More <Play color="#834deb" />
        </Button>
      </div>
    </div>
  );
}
