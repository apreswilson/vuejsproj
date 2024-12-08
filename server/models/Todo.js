import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   completed: {
      type: String,
      required: true
   }
})

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)
export default Todo;