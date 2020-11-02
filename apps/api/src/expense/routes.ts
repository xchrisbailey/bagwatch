import { Request, Response, Router } from 'express';
import { CreateExpense, GetAllExpenses, GetExpense } from './controller';

const router = Router();

router.get('/expenses', async (_req: Request, res: Response) => {
  try {
    const result = await GetAllExpenses();
    res.json({ status: 'ok', data: result });
  } catch (e) {
    res.status(400).json({ status: 'error', message: e.message });
  }
});

router.get('/expenses/:id', async (req: Request, res: Response) => {
  try {
    const result = await GetExpense(req.params.id);
    if (!result) throw new Error('Expense not found');

    res.json({ status: 'ok', data: result });
  } catch (e) {
    res.status(400).json({ status: 'error', message: e.message });
  }
});

router.post('/expenses', async (req: Request, res: Response) => {
  try {
    const result = await CreateExpense({ ...req.body });
    res.json({ status: 'ok', data: result });
  } catch (e) {
    res.status(400).json({ status: 'error', message: e.message });
  }
});

export default router;
