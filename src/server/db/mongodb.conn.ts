// @ts-nocheck

import { MongoClient } from 'mongodb';
let client;
let clientPromise: Promise<MongoClient>;
const uri = process.env.DB_CONN_STRING;
const options = {
  useNewUrlParser: true,
};

if (!uri) {
  throw new Error(
    'No connection to database estabilished due to missing connection details.'
  );
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
