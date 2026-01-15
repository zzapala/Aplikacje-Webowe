export interface Review {
    id: number;
    description: string;
    rating: number;
    userId: number;
    bookId: number;
    createdAt: string;
    User?: {
      id: number;
      email: string;
      login: string;
    };
  }
  