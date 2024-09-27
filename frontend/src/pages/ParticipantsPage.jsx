import { registerParticipant } from "../services/eventService";

export const EventRegistrationPage = ({ eventId }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    heardAboutEvent: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerParticipant(eventId, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="date"
        name="dateOfBirth"
        placeholder="Date of Birth"
        onChange={handleChange}
      />
      <input
        type="text"
        name="heardAboutEvent"
        placeholder="How did you hear about this event?"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};
