import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { mapApiResponseToBook } from "../utils/mapper";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Searches() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  async function onSearch() {
    const res = await fetch(
      `${BASE_URL}/api/v1/catalog/books/search?title=${title}&author=${author}&year=${year}`
    );
    if (!res.ok) {
      console.error("Failed to search books by keyword", res);
      return;
    }
    const { response } = await res.json();
    const data = response.data;

    const books: Book[] = data.map((book: any) => mapApiResponseToBook(book));

    navigate("/books", { state: { books, totalDocSize: response.totalBooks } });
  }

  return (
    <div className="flex items-center gap-5 mt-10">
      <div className="flex-[4]">
        <Input
          placeholder="Write Title here"
          className="rounded-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex-[3]">
        <Input
          placeholder="Write Author here"
          className="rounded-full"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="flex-[2]">
        <Input
          placeholder="Write Year of The Book"
          className="rounded-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className="flex-[1]">
        <Button className="rounded-full" variant={"outline"} onClick={onSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}
