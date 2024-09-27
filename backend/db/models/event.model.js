import mongoose from "mongoose";
const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
      },
    ],
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", EventSchema);
