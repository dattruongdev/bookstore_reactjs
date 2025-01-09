import { addBook, removeBook } from "../redux/slices/cartSlice";

export function addOrRemoveBookFromCart(book: Book, books: Book[]) {
  if (books.some((b) => b._id === book._id)) {
    return removeBook(book);
  } else {
    return addBook(book);
  }
}
