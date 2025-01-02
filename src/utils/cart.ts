import { addBook, removeBook } from "../redux/slices/cartSlice";

export function addOrRemoveBookFromCart(book: Book, books: Book[]) {
  if (books.some((b) => b.id === book.id)) {
    return removeBook(book);
  } else {
    return addBook(book);
  }
}
