import { Request, Response, Router } from 'express';
import router from '../expense/expense.routes';
import User from './user.model';

router.post('/signup', async (req: Request, res: Response) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(200).json({ user, token: token });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('login', async (req: Request, res: Response) => {
  try {
    const user = await User.findByCred(req.body.email, req.body.password);
  } catch (e) {
    res.status(400).json(e);
  }
});
