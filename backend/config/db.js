const mongoose = require("mongoose");



const connectDB = async () => {
  try {
const conn = await mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
});

console.log(conn.connection.readyState);
console.log(conn.connection.host);

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

module.exports = connectDB;