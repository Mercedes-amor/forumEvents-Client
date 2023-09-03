import { Route, Routes } from "react-router-dom";
import "./App.css";
import IsPrivate from "./components/IsPrivate";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import EventsList from "./pages/EventsList"
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import EditEvent from "./components/EditEvent";
import BookSession from "./pages/BookSession"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/create-event" element={<CreateEvent />} />
        <Route path="/events/:eventId/details" element={<EventDetails />} />
        <Route path="/events/:eventId" element={<EditEvent />}/>
        <Route path="/events/:eventId/:sessionId/:activeUserId" element={<BookSession />} />
        <Route
          path="/:userId"
          element={
            <IsPrivate>
              <UserProfile />
            </IsPrivate>
          }
        />
      </Routes>
    </>
  );
}

export default App;
