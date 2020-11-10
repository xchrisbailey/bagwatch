import * as mongoose from 'mongoose';
import { dollarsToCents } from '../utils/math';
import { Expense as IExpense } from '@bagwatch/data';

const expenseSchema: mongoose.Schema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true, set: dollarsToCents },
    category: { type: String, required: true },
    spendDate: { type: Date, default: Date.now, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>('Expense', expenseSchema);
