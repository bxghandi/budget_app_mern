import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import accounts from './routes/api/accounts';
import transactions from './routes/api/transactions';

// ENV variables
dotenv.config();

// Express Application
const app: Application = express();
const apiPort = process.env.PORT;

app.use(express.json(), cors());
app.use('/api/accounts', accounts);
app.use('/api/transactions', transactions);

// Run Server
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

// // Database Name
// const dbName = 'finance';

// async function main() {
//   const url: string = remote_mongoURI;
//   const mongoClient: MongoClient = new MongoClient(url);
//   const mongoConnection: MongoClient = await mongoClient.connect();
//   console.log('Connected successfully to server');

//   return mongoConnection;
// }

// main().catch((err) => console.log(err));

// // Run Server
//   app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

// const db: Db = client.db(dbName);
// export const accounts_collection = db.collection(
//   process.env.ACCOUNTS_COLLECTION as string
// );
// export const transactions_collection = db.collection(
//   process.env.TRANSACTIONS_COLLECTION as string
// );

// // Run Server
// app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

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
