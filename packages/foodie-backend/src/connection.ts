import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';

dotenv.config();

const { DB_NAME, NODE_ENV, PROD_MONGO_URL, DEV_MONGO_URL } = process.env;

const MONGO_URL = NODE_ENV === 'production' ? PROD_MONGO_URL : DEV_MONGO_URL;

let database: Db;
let MongoConnection: any;

export async function MongoConnect() {
  try {

    MongoConnection = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true });

    database = await MongoConnection.db(DB_NAME);
  } catch (ex) {
    throw ex;
  }
}

export async function MongoDisconnect() {

  MongoConnection.close();

}

// write function to disconnect from database

export function DbConnection() {

  const error = 'Service temporarily unavailable';

  if (database) {

    return database;

  } else {

    throw new Error(error);

  }
}
