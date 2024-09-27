import { EventCard } from "./EventCard";
import styles from "./EventList.module.css";

export const EventList = ({ events }) => {
  return (
    <div className={styles.eventList}>
      {events?.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};
