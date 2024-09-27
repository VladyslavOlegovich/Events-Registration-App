import { Event } from "../db/models/event.model.js";
import { Participant } from "../db/models/participant.model.js";

export const registrateParticipant = async (req, res) => {
  try {
    const { fullName, email, dateOfBirth, heardAboutEvent } = req.body;
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!fullName || !email || !dateOfBirth || !heardAboutEvent) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingParticipant = await Participant.findOne({
      email,
      event: eventId,
    });

    if (existingParticipant) {
      return res.status(409).json({
        message: "User is already registered for this event with this email",
      });
    }

    const newParticipant = new Participant({
      fullName,
      email,
      dateOfBirth,
      event: eventId,
      heardAboutEvent,
    });
    event.participants.push(newParticipant._id);
    await event.save();

    await newParticipant.save();

    res.status(201).json({
      message: "Participant registered successfully",
      participant: newParticipant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId).populate("participants");

    if (!event || event.participants.length === 0) {
      return res
        .status(200)
        .json({ message: "No participants found for this event" });
    }

    res.status(200).json(event.participants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
