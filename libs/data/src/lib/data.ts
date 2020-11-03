import { Document } from 'mongoose';

export interface Expense extends Document {
  amount: number;
  description: string;
  category: string;
}
