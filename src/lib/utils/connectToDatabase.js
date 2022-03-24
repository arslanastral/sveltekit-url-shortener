import { MongoClient } from 'mongodb';

let dbExists = null;

let mongoURI = 'mongodb://localhost:27017';

export const connectToDatabase = async () => {
  if (dbExists) {
    console.log('New Mongo Request: Using existing connection');
    return Promise.resolve(dbExists);
  } else {
    return MongoClient.connect(mongoURI)
      .then((client) => {
        let db = client.db('ky');
        console.log('New Database Connection');
        dbExists = db;
        return dbExists;
      })
      .catch((error) => {
        console.log('MongoDB Connection Error');
        console.log(error);
      });
  }
};
