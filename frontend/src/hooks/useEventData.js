import { useEffect, useState } from "react";
import { fetchEvents } from "../services/eventService";

export const useEventData = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    };
    loadEvents();
  }, []);

  return events;
};
