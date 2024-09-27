import { useNavigate } from "react-router-dom";
import styles from "./EventCard.module.css";
export const EventCard = ({ event }) => {
  const { title, description, eventDate, organizer, participants } = event;
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(`/events/${event._id}/register`);
  };

  const handleViewClick = () => {
    navigate(`/events/${event._id}`);
  };

  return (
    <div className={styles.eventCard}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        <strong>Organizer:</strong> {organizer}
      </p>
      <p>
        <strong>Date:</strong> {new Date(eventDate).toLocaleDateString()}
      </p>
      <div>
        <button onClick={handleRegisterClick}>Register</button>
        <button onClick={handleViewClick}>View</button>
      </div>
    </div>
  );
};
