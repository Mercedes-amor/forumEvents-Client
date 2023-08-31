import { Route, Routes } from "react-router-dom";
import "./App.css";
import IsPrivate from "./components/IsPrivate";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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
