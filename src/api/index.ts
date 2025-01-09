import { BookCartItem } from "../redux/slices/cartSlice";

const BASE_SERVER_URL: string = import.meta.env.VITE_BASE_SERVER_URL;

export async function checkout(
  items: BookCartItem[]
): Promise<{ url: string } | null> {
  const res = await fetch(`${BASE_SERVER_URL}/api/v1/transaction/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      books: items.map((item) => ({
        id: item.book._id,
        quantity: item.book.quantity,
        method: item.method,
      })),
    }),
  });
  const { response } = await res.json();
  if (!res.ok) {
    console.error("Error while checking out", response.message);
    return null;
  }

  return { url: response.url };
}
