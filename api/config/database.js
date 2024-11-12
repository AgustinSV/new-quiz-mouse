import mongoose from 'mongoose';

const MONGO_URI =
  'mongodb+srv://quiz_mouse_developers:Y84ylWhncdBFbxnf@quizmouse-db-cluster.wtdl5.mongodb.net/quizmouse-db-cluster?retryWrites=true&w=majority&appName=quizmouse-db-cluster';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

//! avoids reconnecting to database on every function call by caching caching db connection in serverless environments
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      console.log('Connected to database');
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
