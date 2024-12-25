import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Contact() {
  return (
    <div
      className="h-72 w-2/3 lg:w-5/6 m-auto flex items-center rounded-xl px-10"
      style={{
        backgroundImage: "url('/public/contact-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="text-white  w-1/2 lg:w-2/3 ml-auto">
        <h2 className="text-xl lg:text-3xl font-semibold text-left">
          Get the latest news and information about your favorite authors or
          books
        </h2>
        <div className="flex flex-col lg:flex-row gap-5">
          <Input
            placeholder="Enter your email"
            className="rounded-full lg:flex-[3]"
          />
          <Button
            variant="ghost"
            className="bg-pink-400 rounded-full lg:flex-[1]"
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
