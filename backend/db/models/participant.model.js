import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    heardAboutEvent: {
      type: String,
      enum: ["Social media", "Friends", "Found myself"],
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true }
);

export const Participant = mongoose.model("Participant", ParticipantSchema);
