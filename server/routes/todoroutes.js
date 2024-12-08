import express from "express"
import Todo from "../models/Todo.js";
const router = express.Router();

router.get("/", async (req, res) => {
   try {
      const findTodos = await Todo.find({});
      findTodos ? res.send(findTodos).status(200) : res.send("Unable to find").status(404)
   } catch (err) {
      console.error(err)
      res.status(500).json({ error: "There was a server error that occurred" });
   }
})

router.post("/", async (req, res) => {
   try {
      const todoToAdd = {
         name: req.body.name,
         description: req.body.description,
         completed: "Incomplete"
      };
      const addTodo = await Todo.create(todoToAdd);
      addTodo ? res.status(200).json({ success: "Successfully added" }) : res.status(400).json({ error: "Unable to add todo" });
   } catch (err) {
      console.error(err)
      res.send(500).json({ error: "There was a server error that occurred" });
   }
})

router.patch("/:id", async (req, res) => {
   try {
      const newDocument = {
         name: req.body.name,
         description: req.body.description,
         completed: req.body.completed
      }

      const updateTodo = await Todo.findOneAndUpdate(
         { _id: req.params.id },
         {
            name: newDocument.name,
            description: newDocument.description,
            completed: newDocument.completed
         },
         { new: true }
      )
      updateTodo ? res.status(200).json({ success: "Successfully updated" }) : res.status(400).json({ error: "Unable to update todo" });
   } catch (err) {
      console.error(err)
      res.send(500).json({ error: "There was a server error that occurred" })
   }
})

router.delete("/:id", async (req, res) => {
   try {
      const deleteTodo = await Todo.deleteOne({ _id: req.params.id });
      deleteTodo ? res.status(200).json({ success: "Successfull deleted" }) : res.status(400).json({ error: "Unable to delete todo" });
   } catch (err) {
      console.error(err)
      res.send(500).json({ error: "There was a server error that occurred" });
   }
})

export default router;