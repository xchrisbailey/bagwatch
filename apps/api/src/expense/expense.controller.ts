import Expense from './expense.model';
import { Expense as IExpense } from '@bagwatch/data';
import { User as IUser } from '@bagwatch/data';

interface ICreateExpenseInput {
  description: string;
  amount: number;
  category: string;
  user: IUser;
}

export const getAllExpenses = async (user: IUser): Promise<IExpense[]> => {
  const { expenses } = await user
    .populate({ path: 'expenses', options: { sort: { createdAt: -1 } } })
    .execPopulate();
  return expenses;
};

export const getExpense = async (
  id: string,
  user: IUser
): Promise<IExpense> => {
  const { expenses } = await user
    .populate({
      path: 'expenses',
      match: { _id: id },
    })
    .execPopulate();

  return expenses[0];
};

export const createExpense = async ({
  description,
  amount,
  category,
  user,
}: ICreateExpenseInput): Promise<IExpense> => {
  const expense = new Expense();
  expense.amount = amount;
  expense.description = description;
  expense.category = category;
  expense.user = user;
  return await expense.save();
};

export const deleteExpense = async (id: string): Promise<IExpense> => {
  return await Expense.findByIdAndDelete(id);
};
