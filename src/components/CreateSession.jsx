import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";


//BOOSTRAP 
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

export default function CreateSession(props) {
  const paramsEventId = props.params;
  const setIsFormShowing = props.setIsFormShowing
  const handleRefresh = props.handleRefresh
  const navigate = useNavigate();

  // console.log("este console es", paramsEventId);

  const [newSession, setNewSession] = useState({
    sessionName: "",
    description: "",
    day: 0,
    dateSession: "",
    startHour: "",
    endHour: "",
    isAvailable: "false",
    hall: "",
    capacityHall: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

  const handleAddSession = async (e) => {
    // console.log("sesion antes de llegar a la db", newSession)
    e.preventDefault();
    try {
      await service.post(`/events/${paramsEventId}/sessions`, { newSession });
      
      setIsFormShowing(false)
      handleRefresh()
    //   setSuccessMessage("todo ok");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };

  const handleFormChange = (input) => {
    setNewSession({
      ...newSession,
      [input.target.name]: input.target.value,
    });
  };

  return (
    <Form>
      <FloatingLabel controlId="floatingInput" label="Nombre de la sesión" className="mb-3">
      <Form.Control
      placeholder="Nombre de la sesión"
        type="text"
        name="sessionName"
        onChange={handleFormChange}
        value={newSession.sessionName}
      />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Descripción" className="mb-3">
      
      <Form.Control
      placeholder="Descripción"
        type="text"
        name="description"
        onChange={handleFormChange}
        value={newSession.description}
      />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Dia" className="mb-3">
  
      <Form.Control
      placeholder="Dia"
        type="Number"
        name="day"
        onChange={handleFormChange}
        value={newSession.day}
      />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Fecha" className="mb-3">
      
      <Form.Control
      placeholder="Fecha"
        type="date"
        name="dateSession"
        onChange={handleFormChange}
        value={newSession.dateSession}
      />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Hora de inicio" className="mb-3">
      
     
      <Form.Control
            placeholder="Hora de inicio"
        type="text"
        name="startHour"
        onChange={handleFormChange}
        value={newSession.startHour}
      />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Hora de finalización" className="mb-3">
      
      <Form.Control
      placeholder="Hora de finalización"
        type="text"
        name="endHour"
        onChange={handleFormChange}
        value={newSession.endHour}
      />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Sala" className="mb-3">
     
      <Form.Control
      placeholder="Sala"
        type="text"
        name="hall"
        onChange={handleFormChange}
        value={newSession.hall}
      />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Capacidad de la sala" className="mb-3">
      
      <Form.Control
      placeholder="Capacidad de la sala"
        type="Number"
        name="capacityHall"
        onChange={handleFormChange}
        value={newSession.capacityHall}
      />
      </FloatingLabel>
     
      <p>¿Esta disponible?</p>
      <input onChange={handleFormChange} type="radio"  name="isAvailable" value="true" />
      <label htmlFor="isAvailable" >Si</label>
      
      <input onChange={handleFormChange} type="radio"  name="isAvailable" value="false" />
      <label htmlFor="isAvailable" >No</label>
     
      <br />
      <Button className="btn-confirm" type="submit" onClick={handleAddSession}>
        Añadir sesión
      </Button>

      {errorMessage ? <p>{errorMessage}</p> : null}
      {/* {successMessage ? <p>{successMessage}</p> : null} */}
    </Form>
  );
}
