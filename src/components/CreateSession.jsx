import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";

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
    <form>
      <label htmlFor="sessionName">Nombre de la sesión</label>
      <input
        type="text"
        name="sessionName"
        onChange={handleFormChange}
        value={newSession.sessionName}
      />
      <br />
      <label htmlFor="description">Descripción</label>
      <input
        type="text"
        name="description"
        onChange={handleFormChange}
        value={newSession.description}
      />
      <br />
      <label htmlFor="day">Dia</label>
      <input
        type="Number"
        name="day"
        onChange={handleFormChange}
        value={newSession.day}
      />
      <br />
      <label htmlFor="dateSession">Fecha</label>
      <input
        type="date"
        name="dateSession"
        onChange={handleFormChange}
        value={newSession.dateSession}
      />
      <br />
      <label htmlFor="startHour">Hora de inicio</label>
      <input
        type="text"
        name="startHour"
        onChange={handleFormChange}
        value={newSession.startHour}
      />
      <br />
      <label htmlFor="endHour">Hora de finalización</label>
      <input
        type="text"
        name="endHour"
        onChange={handleFormChange}
        value={newSession.endHour}
      />
      <br />
      <label htmlFor="hall">Sala</label>
      <input
        type="text"
        name="hall"
        onChange={handleFormChange}
        value={newSession.hall}
      />
      <br />
      <label htmlFor="capacityHall">Capacidad de la sala</label>
      <input
        type="Number"
        name="capacityHall"
        onChange={handleFormChange}
        value={newSession.capacityHall}
      />
      <br />
      <p>¿Esta disponible?</p>
      <input onChange={handleFormChange} type="radio"  name="isAvailable" value="true" />
      <label htmlFor="isAvailable" >Si</label>
      <br />
      <input onChange={handleFormChange} type="radio"  name="isAvailable" value="false" />
      <label htmlFor="isAvailable" >No</label>
      <br />
      <br />
      <button type="submit" onClick={handleAddSession}>
        Crear sesión
      </button>

      {errorMessage ? <p>{errorMessage}</p> : null}
      {/* {successMessage ? <p>{successMessage}</p> : null} */}
    </form>
  );
}
