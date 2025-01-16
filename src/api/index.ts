import { BookCartItem } from "../redux/slices/cartSlice";
import {
  mapApiResponseToBorrowedBook,
  mapApiResponseToBuy,
} from "../utils/mapper";

const BASE_SERVER_URL: string = import.meta.env.VITE_BASE_SERVER_URL;

export async function checkout(
  items: BookCartItem[],
  token: string,
  userId: string
): Promise<{ url: string } | null> {
  const res = await fetch(`${BASE_SERVER_URL}/api/v1/transaction/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      books: items.map((item) => ({
        id: item.book._id,
        quantity: item.book.quantity,
        method: item.method,
        days: item.days,
      })),
      userId,
    }),
  });
  const { response } = await res.json();
  if (!res.ok) {
    console.error("Error while checking out", response.message);
    return null;
  }

  return { url: response.url };
}

export async function fetchBooksInPage(
  page: number
): Promise<{ books: Book[]; docSize: number }> {
  const res = await fetch(
    `${BASE_SERVER_URL}/api/v1/catalog/books-by-page?page=${page}&size=12`
  );

  if (!res.ok) {
    console.error("Failed to fetch books", res);
    return { books: [], docSize: 0 };
  }

  const { response } = await res.json();

  return { books: response.data, docSize: response.totalBooks };
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_SERVER_URL}/api/v1/catalog/categories`);

  if (!res.ok) {
    console.error("Failed to fetch categories", res);
    return [];
  }

  const { response } = await res.json();
  return response.data;
}

export async function fetchAuthors(): Promise<Author[]> {
  const res = await fetch(
    `${BASE_SERVER_URL}/api/v1/catalog/authors?page=0&size=6`
  );

  if (!res.ok) {
    console.error("Failed to fetch authors", res);
    return [];
  }

  const { response } = await res.json();

  return response.data;
}

export async function fetchBookSales(
  page: number,
  token: string | null
): Promise<Buy[]> {
  if (!token) {
    return [];
  }
  const res = await fetch(
    `${BASE_SERVER_URL}/api/v1/transaction/booksales?page=${page}&size=12`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch book sales", res);
    return [];
  }
  const { response } = await res.json();
  console.log(response.data);

  const data = response.data.map((item: any) => mapApiResponseToBuy(item));
  return data;
}

export async function fetchBorrowedBooks(
  page: number,
  token: string | null
): Promise<Borrow[]> {
  if (!token) {
    return [];
  }
  const res = await fetch(
    `${BASE_SERVER_URL}/api/v1/transaction/borrows?page=${page}&size=12`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch borrowed books", res);
    return [];
  }

  const { response } = await res.json();

  return response.data;
}
