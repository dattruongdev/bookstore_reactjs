declare type Book = {
  _id: string;
  title: string;
  imageUrl: string;
  authors: Author[];
  isFeatured: boolean;
  numberOfCopies: number;
  numberOfPages: number;
  bookPricing: {
    id: string;
    cost: {
      amount: number;
      currencyCode: string;
    };
    originalCost: {
      amount: number;
      currencyCode: string;
    };
    beginDate: string;
    endDate: string;
    discount: number;
    weekDeal: boolean;
  };
  categories: { id: string; name: string }[];
  rating: number;
  publisher: string;
  publishedDate: string;
  description: string;
  quantity: number;
};

declare type Author = {
  _id: string;
  fullName: string;
};

declare type Review = {
  _id: string;
  rating: number;
  content: string;
  bookId: string;
  email: string;
  username: string;
};
