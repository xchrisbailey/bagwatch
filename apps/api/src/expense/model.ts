import { Schema, model } from 'mongoose';
import { dollarsToCents } from '../utils/math';
import { Expense as IExpense } from '@bagwatch/data';

const expenseSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true, set: dollarsToCents },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IExpense>('Expense', expenseSchema);
