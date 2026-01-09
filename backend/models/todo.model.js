import mongoose from "mongoose";


const todoSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  }, 
  status: {
    type: Boolean,
    required: true,
    default: false
  }
})

export const ToDo = mongoose.model('ToDo', todoSchema)

