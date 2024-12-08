import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import router from "./routes/todoroutes.js"

const app = express()
app.use(cors())
app.use(express.json())

await mongoose.connect(process.env.MONGODB_URI, {
   bufferCommands: false
})
   .then(() => console.log("Connected successfully"));

app.use("/todo", router);

app.listen(process.env.PORT, () => {
   console.log(`Listening on ${process.env.PORT}`)
});
