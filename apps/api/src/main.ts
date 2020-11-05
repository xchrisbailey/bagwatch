import * as express from 'express';
import morgan from 'morgan';

import { db } from './config/';
import { ExpenseRouter } from './expense';
import { UserRouter } from './user';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', ExpenseRouter);
app.use('/api', UserRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
db({ db: 'mongodb://localhost:27017/bagwatch_dev' });
server.on('error', console.error);
