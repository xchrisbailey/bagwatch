import { Schema, Document, model } from 'mongoose';

export interface IExpense extends Document {
  description: string;
  amount: number;
  category: string;
}

const ExpenseSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IExpense>('Expense', ExpenseSchema);
