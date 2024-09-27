import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventsPage } from "./pages/EventsPage";
import { EventRegistrationPage } from "./pages/EventRegistrationPage";
import { ParticipantList } from "./components/ParticipantList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <EventsPage />,
  },
  {
    path: "/events/:eventId",
    element: <ParticipantList />,
  },
  {
    path: "/events/:eventId/register",
    element: <EventRegistrationPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
