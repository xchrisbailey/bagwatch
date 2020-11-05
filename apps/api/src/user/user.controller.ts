import { User as IUser } from '@bagwatch/data';
import User from './user.model';

interface ISignup {
  user: IUser;
  token: string;
}

export const signupUser = async (
  name: string,
  email: string,
  password: string
): Promise<ISignup> => {
  const user = new User({ name, email, password });
  await user.save();
  const token = user.generateAuthToken();

  return { user, token };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<ISignup> => {
  const user = await User.findByCred(email, password);
  const token = user.generateAuthToken();
  return { user, token };
};
