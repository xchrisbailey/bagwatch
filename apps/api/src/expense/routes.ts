import { Request, Response, Router } from 'express';
import {
  CreateExpense,
  DeleteExpense,
  GetAllExpenses,
  GetExpense,
} from './controller';

const router = Router();

router.get('/expenses', async (_req: Request, res: Response) => {
  try {
    const result = await GetAllExpenses();
    res.json({ result });
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.get('/expenses/:id', async (req: Request, res: Response) => {
  try {
    const result = await GetExpense(req.params.id);
    if (!result) throw new Error('Expense not found');

    res.json({ result });
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.post('/expenses', async (req: Request, res: Response) => {
  try {
    const result = await CreateExpense({ ...req.body });
    res.json({ result });
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.delete('/expenses/:id', async (req: Request, res: Response) => {
  try {
    const result = await DeleteExpense(req.params.id);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ e });
  }
});

export default router;
