import express from "express";
import mongoose from "mongoose";
import eventsRouter from "./routes/eventsRouter.js";
import participantsRouter from "./routes/participantsRouter.js";
import cors from "cors";

const PORT = 5000;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/events", eventsRouter);
app.use("/api/participants", participantsRouter);

async function startApp() {
  try {
    await mongoose.connect(
      "mongodb+srv://user:1111@backenddb.9l0gl.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB"
    );
    console.log("connected db");

    await app.listen(PORT, () => {
      console.log("server is started on port " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
