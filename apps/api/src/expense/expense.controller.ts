import Expense from './expense.model';
import { Expense as IExpense } from '@bagwatch/data';

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
  const expense = new Expense();
  expense.amount = amount;
  expense.description = description;
  expense.category = category;
  return await expense.save();
};

export const DeleteExpense = async (id: string): Promise<IExpense> => {
  return await Expense.findByIdAndDelete(id);
};
