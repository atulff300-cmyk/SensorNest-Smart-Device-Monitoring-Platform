import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://atulff300_db_user:SensorNestPass2026@ac-brpzfv3-shard-00-00.0j4rxl3.mongodb.net:27017,ac-brpzfv3-shard-00-01.0j4rxl3.mongodb.net:27017,ac-brpzfv3-shard-00-02.0j4rxl3.mongodb.net:27017/SENSOR-NEST?ssl=true&replicaSet=atlas-52dj8l-shard-0&authSource=admin&appName=Sensornextdb";

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      family: 4, // Force IPv4 to prevent ECONNREFUSED DNS errors
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB successfully connected!');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB Connection Error:', e.message);
    console.error('Please check your MONGODB_URI and ensure your IP is whitelisted in MongoDB Atlas.');
    throw new Error('Failed to connect to MongoDB: ' + e.message);
  }

  return cached.conn;
}

export default connectToDatabase;
