import { Document, Model } from 'mongoose';

export interface Expense extends Document {
  amount: number;
  description: string;
  category: string;
  createdAt: string;
  user: User;
}

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: string;
  expenses?: Expense[];
  generateAuthToken(): string;
}

export interface UserModel extends Model<User> {
  findByCred(email: string, password: string): Promise<User>;
}
