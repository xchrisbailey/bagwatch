import * as mongoose from 'mongoose';

type TInput = {
  db: string;
};

export default async ({ db }: TInput) => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.info(`🧨 connected to ${db}`);
  } catch (e) {
    console.error(`error connecting to db: ${e}`);
    return process.exit(1);
  }
};

export const conn = mongoose.connection;
