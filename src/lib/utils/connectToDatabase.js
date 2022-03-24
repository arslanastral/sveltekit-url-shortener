// @ts-nocheck
import { MongoClient } from 'mongodb';

let dbExists = null;

export const connectToDatabase = async () => {
  if (dbExists) {
    console.log('New Mongo Request: Using existing connection');
    return dbExists;
  } else {
    try {
      const client = new MongoClient(import.meta.env.VITE_MONGODB_URI);
      await client.connect();
      let db = client.db('ky');
      console.log('New Database Connection');
      dbExists = db;
      return dbExists;
    } catch (error) {
      console.log('MongoDB Connection Error');
      console.log(error);
    }
  }
};
