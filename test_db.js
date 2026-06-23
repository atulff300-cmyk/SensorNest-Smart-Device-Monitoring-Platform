const mongoose = require('mongoose');

const uri = "mongodb+srv://atulff300_db_user:4S1lEnlMQ9dWaJz4@sensornextdb.0j4rxl3.mongodb.net/SENSOR-NEST?appName=Sensornextdb";

async function testConnection() {
  console.log("Testing connection to MongoDB Atlas...");
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("SUCCESS: Connected to the database!");
    process.exit(0);
  } catch (err) {
    console.error("FAILED: Could not connect to the database.");
    console.error(err.message);
    process.exit(1);
  }
}

testConnection();
