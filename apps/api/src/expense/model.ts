import { Schema, Document, model } from 'mongoose';
import { dollarsToCents } from '../utils/math';

export interface IExpense extends Document {
  description: string;
  amount: number;
  category: string;
}

const expenseSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true, set: dollarsToCents },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IExpense>('Expense', expenseSchema);
