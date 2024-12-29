declare type Book = {
  id: string;
  title: string;
  imageUrl: string;
  authors: Author[];
  featured: boolean;
  cost: {
    amount: number;
    currencyCode: string;
    beginDate: string;
    endDate: string;
  };
  categories: string[];
  rating: number;
  publisher: string;
  publishedDate: string;
  description: string;
}

declare type Author = {
  id: string;
  name: string;
}
