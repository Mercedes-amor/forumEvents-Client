import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";

export default function EditSession() {
  const navigate = useNavigate();
  const params = useParams();
  const { activeUserId, eventId, sessionId } = params;
  // console.log("params", params)

  const [editSession, setEditSession] = useState({
    sessionName: "",
    description: "",
    hostedBy: activeUserId,
    isAvailable: "false",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditSession = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/events/${eventId}/sessions/${sessionId}`, {
        editSession,
      });

      navigate(`/events/${eventId}/details`);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };

  const handleFormChange = (input) => {
    setEditSession({
      ...editSession,
      [input.target.name]: input.target.value,
    });
  };

  return (
    <form>
      <label htmlFor="sessionName">Nombre de la sesión</label>
      <input
        type="text"
        name="sessionName"
        onChange={handleFormChange}
        value={editSession.sessionName}
      />
      <br />
      <label htmlFor="description">Descripción</label>
      <input
        type="text"
        name="description"
        onChange={handleFormChange}
        value={editSession.description}
      />
      <br />

      <button type="submit" onClick={handleEditSession}>
        Editar sesión ESTO
      </button>

      {errorMessage ? <p>{errorMessage}</p> : null}
      {/* {successMessage ? <p>{successMessage}</p> : null} */}
    </form>
  );
}
