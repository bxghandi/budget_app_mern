/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MongoClient,
  Db,
  Collection,
  ObjectID,
  InsertOneWriteOpResult,
  DeleteWriteOpResultObject,
  UpdateWriteOpResult,
} from 'mongodb';
import { DbConnection } from './dbConnection';
import { AccountsType } from './models/accounts';
import { TransactionType } from './models/transactions';

const dbName = process.env.DB as string;

export async function getOne(
  collectionName: string,
  id: string
): Promise<any[]> {
  const dbPromise: MongoClient = await DbConnection.Get();
  const db: Db = dbPromise.db(dbName);
  const collection: Collection = db.collection(collectionName);
  const getResult = await collection.find({ _id: new ObjectID(id) }).toArray();
  return getResult;
}

export async function getAll(collectionName: string): Promise<any[]> {
  const dbPromise: MongoClient = await DbConnection.Get();
  const db: Db = dbPromise.db(dbName);
  const collection: Collection = db.collection(collectionName);

  const getResult = collection.find({}).toArray();
  return getResult;
}

export async function postOne(
  collectionName: string,
  newOne: AccountsType | TransactionType
): Promise<InsertOneWriteOpResult<any>> {
  const dbPromise: MongoClient = await DbConnection.Get();
  const db: Db = dbPromise.db(dbName);
  const collection: Collection = db.collection(collectionName);
  const postResult = await collection.insertOne(newOne);
  return postResult;
}

export async function deleteOne(
  collectionName: string,
  id: string
): Promise<DeleteWriteOpResultObject> {
  const dbPromise: MongoClient = await DbConnection.Get();
  const db: Db = dbPromise.db(dbName);
  const collection: Collection = db.collection(collectionName);
  const deleteResult = await collection.deleteOne({ _id: new ObjectID(id) });
  return deleteResult;
}

export async function deleteMany(collectionName: string, idArray: string[]) {
  const ids: ObjectID[] = idArray.map((id) => new ObjectID(id));
  const dbPromise: MongoClient = await DbConnection.Get();
  const db: Db = dbPromise.db(dbName);
  const collection: Collection = db.collection(collectionName);
  const deleteResults = await collection.deleteMany({ _id: { $in: ids } });
  return deleteResults;
}

export async function patchOne(
  collectionName: string,
  id: string,
  update: any
): Promise<UpdateWriteOpResult> {
  const dbPromise: MongoClient = await DbConnection.Get();
  const db: Db = dbPromise.db(dbName);
  const collection: Collection = db.collection(collectionName);
  const patchResults = await collection.updateOne(
    { _id: new ObjectID(id) },
    { $set: update }
  );
  return patchResults;
}
