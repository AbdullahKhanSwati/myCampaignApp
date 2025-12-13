// import mongoose from "mongoose";


// const connectDb = async()=>{
// try {
//     const conn = await mongoose.connect(process.env.MONGO_URL);
//     console.log(`connected to database successfull`);

// } catch (error) {
//     console.log(error);
// }

// }
// export default connectDb;





import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) return cached.conn;

  cached.promise = mongoose.connect(process.env.MONGO_URL, {
    bufferCommands: false,
  });

  cached.conn = await cached.promise;
  console.log("✅ MongoDB connected");
  return cached.conn;
};

export default connectDb;
