import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ParticipantList.module.css";

export const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/participants/${eventId}`
        );
        const data = await response.json();

        if (data.message) {
          setMessage(data.message);
        } else {
          setParticipants(data);
          setFilteredParticipants(data);
        }
      } catch (error) {
        console.error("Error fetching participants:", error);
        setMessage("Failed to load participants.");
      }
    };

    fetchParticipants();
  }, [eventId]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    const filtered = participants.filter(
      (participant) =>
        participant.fullName.toLowerCase().includes(value.toLowerCase()) ||
        participant.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredParticipants(filtered);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.participantList}>
      <button className={styles.backButton} onClick={handleBack}>
        Go to the Events List
      </button>
      <input
        type="text"
        placeholder="Search participants..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      {message ? (
        <p>{message}</p>
      ) : filteredParticipants.length > 0 ? (
        filteredParticipants.map((participant) => (
          <div key={participant._id} className={styles.participantCard}>
            <p>
              <strong>Name:</strong> {participant.fullName}
            </p>
            <p>
              <strong>Email:</strong> {participant.email}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(participant.dateOfBirth).toLocaleDateString()}
            </p>
            <p>
              <strong>Heard About Event:</strong> {participant.heardAboutEvent}
            </p>
          </div>
        ))
      ) : (
        <p>No participants available for this event.</p>
      )}
    </div>
  );
};
