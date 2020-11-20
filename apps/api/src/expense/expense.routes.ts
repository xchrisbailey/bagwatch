import { Request, Response, Router } from 'express';
import { auth } from '../middleware/auth';
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
} from './expense.controller';

const router = Router();

router.get('/expenses', auth, async (req: Request, res: Response) => {
  try {
    const month: number = +req.params.month;
    const year: number = +req.params.year;
    const result = await getAllExpenses(req.user, month, year);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.get('/expenses/:id', auth, async (req: Request, res: Response) => {
  try {
    const result = await getExpense(req.params.id, req.user);
    if (!result) throw new Error('Expense not found');

    res.json({ result });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.post('/expenses', auth, async (req: Request, res: Response) => {
  try {
    const result = await createExpense({ ...req.body, user: req.user });
    res.json({ result });
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.delete('/expenses/:id', auth, async (req: Request, res: Response) => {
  try {
    const result = await deleteExpense(req.params.id, req.user);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ e });
  }
});

export default router;
