import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

interface Connection {
  db: MongoClient | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DbConnect: () => Promise<MongoClient>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Get: () => Promise<MongoClient>;
}

export const DbConnection: Connection = {
  db: null,
  DbConnect: async (): Promise<MongoClient> => {
    try {
      const url: string = process.env.REMOTE_MONGOURI as string;
      const _db = await MongoClient.connect(url, { useUnifiedTopology: true });
      return _db;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err;
    }
  },
  Get: async (): Promise<MongoClient> => {
    try {
      if (DbConnection.db !== null) {
        console.log('db connection already alive');
        return DbConnection.db;
      } else {
        console.log('getting new db connection');
        DbConnection.db = await DbConnection.DbConnect();
        return DbConnection.db;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err;
    }
  },
};
