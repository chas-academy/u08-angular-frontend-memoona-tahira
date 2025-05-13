export interface Book {
  _id?: string;
    title: string;
    author: string;
    year?: number;
    genre?: string;
    rating?: number;
    isRead?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
