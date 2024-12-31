declare type Book = {
  id: string;
  title: string;
  imageUrl: string;
  authors: Author[];
  featured: boolean;
  bookPricing: {
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
  categories: string[];
  rating: number;
  publisher: string;
  publishedDate: string;
  description: string;
};

declare type Author = {
  id: string;
  fullName: string;
};
