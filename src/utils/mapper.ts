export function mapApiResponseToBook(book: any): Book {
  return {
    id: (book.id as string) ?? (book._id as string),
    title: book.title as string,
    imageUrl: book.imageUrl as string,
    bookPricing: book.bookPricing,
    rating: book.rating,
    authors: book.authors.map((author: any) => ({
      id: author.id ?? author._id,
      fullName: author.fullName,
    })),
    isFeatured: book.featured,
    publisher: book.publisher,
    publishedDate: book.publishedDate,
    categories: book.categories.map((cat: any) => ({
      id: cat.id ?? cat._id,
      name: cat.name,
    })),
    description: book.description,
    quantity: 1,
  };
}
