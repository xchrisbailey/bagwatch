import { Router } from 'express';
import Expense from './model';

const router = Router();

router.get('/expenses', async (_req, res) => {
  try {
    const result = await Expense.find({});
    res.json({ status: 'ok', data: result });
  } catch (e) {
    res.status(400).json({ status: 'error', message: e.message });
  }
});

router.get('/expenses/:id', async (req, res) => {
  try {
    const result = await Expense.findById(req.params.id);
    if (!result) throw new Error('Expense not found');

    res.json({ status: 'ok', data: result });
  } catch (e) {
    res.status(400).json({ status: 'error', message: e.message });
  }
});

export default router;
