import * as express from 'express';
import db from './db';
import { ExpenseRouter } from './expense';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', ExpenseRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
db({ db: 'mongodb://localhost:27017/bagwatch_dev' });
server.on('error', console.error);
