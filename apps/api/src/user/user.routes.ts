import { Request, Response, Router } from 'express';
import { auth } from '../middleware/auth';
import { loginUser, signupUser } from './user.controller';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const result = await signupUser(name, email, password);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/users/me', auth, async (req: Request, res: Response) => {
  try {
    await req.user.remove();
    res.json(req.user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
