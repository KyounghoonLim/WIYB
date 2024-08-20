import { User } from "./user.interface";

export type Review = {
  id: string;
  content: string;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
  user: User;
};
