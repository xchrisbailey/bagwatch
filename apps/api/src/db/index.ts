import * as mongoose from 'mongoose';

type TInput = {
  db: string;
};

export default ({ db }: TInput) => {
  const connect = async () => {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.info(`connected to ${db}`);
    } catch (e) {
      console.error(`error connecting to db: ${e}`);
      return process.exit(1);
    }
  };

  connect();
  mongoose.connection.on('disconnected', connect);
};
