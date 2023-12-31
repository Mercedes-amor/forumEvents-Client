import { Route, Routes } from "react-router-dom";
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
import DeletedUser from "./pages/DeletedUser";
import PaymentSuccess from "./components/PaymentSuccess";
import Footer from "./components/Footer";

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";




function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/deletedUser" element={<DeletedUser />} />
        <Route path="/events/:query" element={<EventsList />} />
        <Route path="/events/create-event" element={<IsPrivate><CreateEvent /></IsPrivate>} />
        <Route path="/events/:eventId/details" element={<IsPrivate><EventDetails /></IsPrivate>} />
        <Route path="/events/:eventId/edit" element={<EditEvent />}/>
        <Route path="/events/:eventId/:sessionId/:activeUserId" element={<IsPrivate><BookSession /></IsPrivate>} />
        <Route path="/userProfile"  element={<IsPrivate><UserProfile /></IsPrivate>}/>

        <Route path="/payment-success" element={ <PaymentSuccess/> }/>
        
     </Routes>

     <Footer />
    </>

  );
}



export default App;

