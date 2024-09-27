import { Router } from "express";
import {
  getParticipants,
  registrateParticipant,
} from "../controllers/participantsController.js";
const participantsRouter = Router();

participantsRouter.get("/:eventId", getParticipants);
participantsRouter.post("/:eventId", registrateParticipant);

export default participantsRouter;
