import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../user/user.model';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '');
    const decoded: any = jwt.verify(token, 'secretTmp');
    const user = await User.findOne({ _id: decoded._id });

    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ error: 'please login' });
  }
};
