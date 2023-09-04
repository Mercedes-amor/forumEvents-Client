import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";



export default function EditSession(props) {
const { sessionId, eventId, setIsEditSessionhowing, handleRefresh, eachSession } = props
 console.log(props)

    const [editSession, setEditSession] = useState({
        sessionName: eachSession.sessionName,
        description: eachSession.description,
        day: eachSession.day,
        dateSession: eachSession.dateSession,
        startHour: eachSession.startHour,
        endHour: eachSession.endHour,
        isAvailable: eachSession.isAvailable,
        hall: eachSession.hall,
        assistants: eachSession.assistants
       
      });
      const [errorMessage, setErrorMessage] = useState("");
      
 
     


      const handleEditSession = async (e) => {
        e.preventDefault();
        try {
          await service.put(`/events/${eventId}/sessions/${sessionId}`, { editSession });
          
          setIsEditSessionhowing()
          handleRefresh()
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
      <label htmlFor="day">Dia</label>
      <input
        type="Number"
        name="day"
        onChange={handleFormChange}
        value={editSession.day}
      />
      <br />
      <label htmlFor="dateSession">Fecha</label>
      <input
        type="date"
        name="dateSession"
        onChange={handleFormChange}
        value={editSession.dateSession}
      />
      <br />
      <label htmlFor="startHour">Hora de inicio</label>
      <input
        type="text"
        name="startHour"
        onChange={handleFormChange}
        value={editSession.startHour}
      />
      <br />
      <label htmlFor="endHour">Hora de finalización</label>
      <input
        type="text"
        name="endHour"
        onChange={handleFormChange}
        value={editSession.endHour}
      />
      <br />
      <label htmlFor="hall">Sala</label>
      <input
        type="text"
        name="hall"
        onChange={handleFormChange}
        value={editSession.hall}
      />
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
      <input onChange={handleFormChange} type="radio"  name="isAvailable" value="true" />
      <label htmlFor="isAvailable" >Si</label>
      <br />
      <input  onChange={handleFormChange} type="radio"  name="isAvailable" value="false" />
      <label htmlFor="isAvailable" >No</label>
      <br />
        {errorMessage ? <p>{errorMessage}</p> : null}
      <br />
      <button type="submit" onClick={handleEditSession}>
        Editar sesión ESTO
      </button>

    
      {/* {successMessage ? <p>{successMessage}</p> : null} */}
    </form>
  )
}
