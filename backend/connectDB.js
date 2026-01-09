
import mongoose from "mongoose";

export async function connectDB() {

  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log('Data base connected successfully')
  } catch (error) {
    console.error('Internal server error: ', error)
    process.exit(1)
  }
}