import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";


//BOOSTRAP
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";


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
    <Form>
      <FloatingLabel
        controlId="floatingInput"
        label="Nombre de la sesión"
        className="mb-3"
      >
        <Form.Control
          placeholder="Nombre de la sesión"
          type="text"
          name="sessionName"
          onChange={handleFormChange}
          value={editSession.sessionName}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Descripción"
        className="mb-3"
      >
        <Form.Control
          placeholder="Descripción"
          type="text"
          name="description"
          onChange={handleFormChange}
          value={editSession.description}
        />
      </FloatingLabel>

      <Button type="submit" onClick={handleEditSession}>
        Reservar sesión
      </Button>

      {errorMessage ? <p>{errorMessage}</p> : null}
      {/* {successMessage ? <p>{successMessage}</p> : null} */}
    </Form>
  );
}
