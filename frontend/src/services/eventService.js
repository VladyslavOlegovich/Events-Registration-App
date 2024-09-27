// const API_URL = "http://localhost:5000/api";
const API_URL = "https://events-registration-app-bv5j.onrender.com/api";

export const fetchEvents = async (
  page = 1,
  sortBy = "eventDate",
  order = "asc",
  searchQuery = ""
) => {
  try {
    const response = await fetch(
      `${API_URL}/events?page=${page}&limit=8&sortBy=${sortBy}&order=${order}&search=${searchQuery}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return { events: [], totalPages: 0, error: error.message };
  }
};

export const registerParticipant = async (eventId, participantData) => {
  const response = await fetch(`${API_URL}/participants/${eventId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participantData),
  });
  const data = await response.json();
  return data;
};

export const fetchParticipants = async (eventId) => {
  const response = await fetch(`${API_URL}/events/${eventId}/participants`);
  const data = await response.json();
  return data;
};
