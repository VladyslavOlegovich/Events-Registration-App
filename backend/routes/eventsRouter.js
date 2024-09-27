import { Router } from "express";
import { createEvent, getAllEvents } from "../controllers/eventsController.js";
const eventsRouter = Router();

eventsRouter.get("/", getAllEvents);
eventsRouter.post("/", createEvent);

export default eventsRouter;
