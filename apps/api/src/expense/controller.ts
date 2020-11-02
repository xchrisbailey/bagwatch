import { DollarsToCents } from '../utils/DollarsToCents';
import Expense, { IExpense } from './model';

interface ICreateExpenseInput {
  description: string;
  amount: number;
  category: string;
}

export const GetAllExpenses = async (): Promise<IExpense[]> => {
  return await Expense.find({});
};

export const GetExpense = async (id: string): Promise<IExpense> => {
  return await Expense.findById(id);
};

export const CreateExpense = async ({
  description,
  amount,
  category,
}: ICreateExpenseInput): Promise<IExpense> => {
  const parsedAmount: number = DollarsToCents(amount);
  return await Expense.create({ description, amount: parsedAmount, category });
};