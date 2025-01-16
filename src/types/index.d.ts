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

declare type Category = {
  id: string;
  name: string;
};

declare type Borrow = {
  id: string;
  title: string;
  bookId: string;
  copyId: string;
  price: number;
  currency: string;
  borrowedAt: string;
  borrowUntil: string;
  endDate: string;
};

declare type Buy = {
  id: string;
  title: string;
  quantity: number;
  totalPrice: number;
  boughtAt: string;
  currency: string;
};
