import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <div className="py-10 mt-10 bg-[#2d276e]">
      <div className="flex w-full mb-20">
        <h1 className="flex-[2] text-white">BOOKTOPIA</h1>
        <div className="flex-[3] flex gap-20">
          <ul className="flex gap-5 flex-col text-left">
            <li>
              <a className="text-white">BOOKTOPIA</a>
            </li>
            <li>
              <a className="text-zinc-400">45B Somewhere, Some city</a>
            </li>
            <li>
              <a className="text-zinc-400">Some building</a>
            </li>
            <li>
              <a className="text-zinc-400">123-456-7890</a>
            </li>
            <li>
              <a className="text-zinc-400">support@booktopia.com</a>
            </li>
          </ul>

          <ul className="flex gap-5 flex-col text-left">
            <li>
              <a className="text-white">EXPLORE</a>
            </li>
            <li>
              <a className="text-zinc-400">About Us</a>
            </li>
            <li>
              <a className="text-zinc-400">Terms & Conditions</a>
            </li>
            <li>
              <a className="text-zinc-400">Customer Service</a>
            </li>
            <li>
              <a className="text-zinc-400">Contact Us</a>
            </li>
          </ul>

          <ul className="flex gap-5 flex-col text-left">
            <li>
              <a className="text-[#2d276e]">-</a>
            </li>
            <li>
              <a className="text-zinc-400">FAQs</a>
            </li>
            <li>
              <a className="text-zinc-400">Shops</a>
            </li>
            <li>
              <a className="text-zinc-400">Blogs</a>
            </li>
            <li>
              <a className="text-zinc-400">Events</a>
            </li>
          </ul>

          <div>
            <div className="text-white">FOLLOW US</div>
            <div className="flex"></div>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-4/5 m-auto bg-zinc-300 mb-2"></div>
      <div className="w-4/5 m-auto text-white text-left flex items-center">
        Copyright <Copyright className="mx-1 text-sm" color="white" size={10} />{" "}
        2024 Booktopia
      </div>
    </div>
  );
}
