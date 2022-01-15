import express, { Application } from 'express';
// import mongoose from 'mongoose';
import cors from 'cors';
import { remote_mongoURI, local_mongoURI } from './config/keys';
import transactions from './routes/api/transactions';
import accounts from './routes/api/accounts';
import * as dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';

// ENV variables
dotenv.config();

// Express Application
const app: Application = express();
const apiPort = process.env.PORT;

// Body Parsing Middleware
app.use(express.json(), cors());

// Use Routes
app.use('/api/transactions', transactions);
app.use('/api/accounts', accounts);

// Mongo Client
const url: string = remote_mongoURI;
const client: MongoClient = new MongoClient(url);

// Database Name
const dbName = 'finance';

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
}

main().then(console.log).catch(console.error);

const db: Db = client.db(dbName);
export const accounts_collection = db.collection(
  process.env.ACCOUNTS_COLLECTION as string
);
export const transactions_collection = db.collection(
  process.env.TRANSACTIONS_COLLECTION as string
);

// Run Server
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

// // Connect to Mongo
// mongoose
//   .connect(remote_mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log('Remote MongoDB Connected...'))
//   .catch((err) => {
//     console.log(err);
//     mongoose
//       .connect(local_mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then(() => console.log('Local MongoDB Connected...'))
//       .catch((error) => console.log(error));
//   });
