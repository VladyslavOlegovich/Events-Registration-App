import { useState } from "react";
import { registerParticipant } from "../services/eventService";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EventRegistrationPage.module.css";

export const EventRegistrationPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    heardAboutEvent: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await registerParticipant(eventId, formData);
      setMessage(response.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error registering participant"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <div className={styles.spinner}></div>}

      {!message && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            onChange={handleChange}
            required
          />

          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="heardAboutEvent"
                value="Social media"
                onChange={handleChange}
                required
              />
              Social media
            </label>
            <label>
              <input
                type="radio"
                name="heardAboutEvent"
                value="Friends"
                onChange={handleChange}
                required
              />
              Friends
            </label>
            <label>
              <input
                type="radio"
                name="heardAboutEvent"
                value="Found myself"
                onChange={handleChange}
                required
              />
              Found myself
            </label>
          </div>

          <button className={styles.submitButton} type="submit">
            Register
          </button>
          <button className={styles.backButton} onClick={handleBack}>
            Go to the Events List
          </button>
        </form>
      )}

      {message && (
        <div className={styles.message}>
          <p>{message}</p>
          <button className={styles.backButton} onClick={handleBack}>
            Go to the Events List
          </button>
        </div>
      )}
    </>
  );
};
