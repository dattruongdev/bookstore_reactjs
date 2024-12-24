import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Searches() {
  return (
    <div className="flex items-center gap-5 mt-10">
      <div className="flex-[4]">
        <Input placeholder="Write Title here" className="rounded-full" />
      </div>
      <div className="flex-[3]">
        <Input placeholder="Write Author here" className="rounded-full" />
      </div>
      <div className="flex-[2]">
        <Input placeholder="Write Year of The Book" className="rounded-full" />
      </div>
      <div className="flex-[1]">
        <Button className="rounded-full" variant={"outline"}>
          Search
        </Button>
      </div>
    </div>
  );
}
