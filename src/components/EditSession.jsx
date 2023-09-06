import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";

//BOOSTRAP
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

export default function EditSession(props) {
  const {
    sessionId,
    eventId,
    setIsEditSessionhowing,
    handleRefresh,
    eachSession,
  } = props;
  console.log(props);

  const [editSession, setEditSession] = useState({
    sessionName: eachSession.sessionName,
    description: eachSession.description,
    day: eachSession.day,
    dateSession: eachSession.dateSession,
    startHour: eachSession.startHour,
    endHour: eachSession.endHour,
    isAvailable: eachSession.isAvailable,
    hall: eachSession.hall,
    assistants: eachSession.assistants,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditSession = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/events/${eventId}/sessions/${sessionId}`, {
        editSession,
      });

      setIsEditSessionhowing();
      handleRefresh();
      setSuccessMessage("todo ok");
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
      <FloatingLabel controlId="floatingInput" label="Dia" className="mb-3">
        <Form.Control
          placeholder="Día"
          type="Number"
          name="day"
          onChange={handleFormChange}
          value={editSession.day}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Fecha" className="mb-3">
        <Form.Control
          placeholder="Fecha"
          type="date"
          name="dateSession"
          onChange={handleFormChange}
          value={editSession.dateSession}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Hora de inicio"
        className="mb-3"
      >
        <Form.Control
          placeholder="Hora de inicio"
          type="text"
          name="startHour"
          onChange={handleFormChange}
          value={editSession.startHour}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Hora de finalización"
        className="mb-3"
      >
        <Form.Control
          placeholder="Hora de finalización"
          type="text"
          name="endHour"
          onChange={handleFormChange}
          value={editSession.endHour}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Sala" className="mb-3">
        <Form.Control
          placeholder="Sala"
          type="text"
          name="hall"
          onChange={handleFormChange}
          value={editSession.hall}
        />
      </FloatingLabel>
      <br />
      {/* <label htmlFor="capacityHall">Capacidad de la sala</label>
      <input
        type="Number"
        name="capacityHall"
        onChange={handleFormChange}
        value={editSession.capacityHall}
      /> */}
      <br />
      <p>¿Esta disponible?</p>
      <input
        onChange={handleFormChange}
        type="radio"
        name="isAvailable"
        value="true"
      />
      <label htmlFor="isAvailable">Si</label>
      <br />
      <input
        onChange={handleFormChange}
        type="radio"
        name="isAvailable"
        value="false"
      />
      <label htmlFor="isAvailable">No</label>
      <br />
      {errorMessage ? <p>{errorMessage}</p> : null}
      <br />
      <Button type="submit" variant="info" onClick={handleEditSession}>
        Editar sesión
      </Button>

      {/* {successMessage ? <p>{successMessage}</p> : null} */}
    </Form>
  );
}
