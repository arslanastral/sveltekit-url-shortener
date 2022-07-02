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
      await db.collection('urls').createIndex({ short_url: 1 }, { unique: true });
      await db
        .collection('urls')
        .createIndex(
          { demo: 1 },
          { expireAfterSeconds: 604800, partialFilterExpression: { demo: { $exists: true } } }
        );
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
      await db.collection('users').createIndex({ sessionId: 1 });
      console.log('New Database Connection');
      dbExists = db;
      return dbExists;
    } catch (error) {
      console.log('MongoDB Connection Error');
      console.log(error);
    }
  }
};
