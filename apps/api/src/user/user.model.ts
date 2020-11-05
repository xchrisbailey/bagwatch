import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User as IUser, UserModel } from '@bagwatch/data';

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 7, trim: true },
  },
  { timestamps: true }
);

userSchema.virtual('expenses', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'user',
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  return userObject;
};

userSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  return token;
};

userSchema.statics.findByCred = async (
  email: string,
  password: string
): Promise<IUser | Error> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Unable to login');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('invalid password');

  return user;
};

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
