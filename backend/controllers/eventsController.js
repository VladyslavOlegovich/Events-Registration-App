import { Event } from "../db/models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, eventDate, organizer } = req.body;

    if (!title || !description || !eventDate || !organizer) {
      return res.status(400).json({
        message:
          "All fields (title, description, eventDate, organizer) are required.",
      });
    }

    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
      return res.status(400).json({
        message: "Event with this title already exists.",
      });
    }

    const event = new Event({
      title,
      description,
      eventDate,
      organizer,
    });

    await event.save();

    res.status(201).json({
      message: "Event created successfully.",
      event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error. Unable to create event.",
      error: error.message,
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sortBy = "eventDate",
      order = "asc",
      search = "",
    } = req.query;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    sortOptions[sortBy] = order === "desc" ? -1 : 1;

    const searchFilter = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const events = await Event.find(searchFilter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    const totalEvents = await Event.countDocuments(searchFilter);

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found." });
    }

    res.status(200).json({
      events,
      totalPages: Math.ceil(totalEvents / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error. Unable to fetch events.",
      error: error.message,
    });
  }
};
