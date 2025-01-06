import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type Props = {
  onSearch: (books: Book[]) => void;
};

export default function SearchInputFilter({ onSearch }: Props) {
  const [search, setSearch] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(
      `${BASE_URL}/api/v1/catalog/books/search?title=${search}`
    );
    if (!res.ok) {
      console.error("Failed to search books by keyword", res);
      return;
    }
    const { response } = await res.json();
    const data = response.data;

    onSearch(data);
  }

  return (
    <form className="relative w-full mb-10" onSubmit={handleSubmit}>
      <Input
        placeholder="Books by keyword"
        className="bg-white/80 rounded-full w-full pr-14 focus:border-zinc-500 focus:ring-0 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        type="submit"
        variant="ghost"
        className="bg-pink-400 px-5 rounded-full absolute top-0 right-0"
      >
        <Search />
      </Button>
    </form>
  );
}
