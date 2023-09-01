import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [newEvent, setNewEvent] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    itsFree: true,
    capacity: 0,
    sector: "Otro",
    description: "",
    imgEvent: "",
  });

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
   
   await service.post("/events", { newEvent

   }) 

    } catch (error) {}
  };

  const handleFormChange = (input) => {
    setNewEvent({
      ...newEvent,
      [input.target.name]: input.target.value,
    });
  };

  return (
    <form>
      <label htmlFor="eventName">Nombre del evento</label>
      <input
        type="text"
        name="eventName"
        onChange={handleFormChange}
        value={newEvent.eventName}
      />
      <br />
      <label htmlFor="startDate">Fecha de inicio</label>
      <input
        type="date"
        name="startDate"
        onChange={handleFormChange}
        value={newEvent.startDate}
      />
      <br />
      <label htmlFor="endtDate">Fecha de finalización</label>
      <input
        type="date"
        name="endDate"
        onChange={handleFormChange}
        value={newEvent.endDate}
      />
      <br />
      <label htmlFor="itsFree">¿Es gratuito?</label>
      <select
        name="itsFree"
        onChange={handleFormChange}
        value={newEvent.itsFree}
      >
        <option value="true">
          si
        </option>
        <option value="false">No</option>
      </select>
      <br />
      <label htmlFor="capacity">Capacidad</label>
      <input
        type="Number"
        name="capacity"
        onChange={handleFormChange}
        value={newEvent.capacity}
      />
      <br />
      <label htmlFor="sector">Sector</label>
      <select
        name="sector"
        onChange={handleFormChange}
        value={newEvent.sector}
     
      >
        <option value="otro">Otro</option>
        <option value="tecnológico" >
        tecnológico
        </option>
        <option value="medicina" >medicina</option>
        <option value="ciencia">ciencia</option>
        <option value="gastronómico">gastronómico</option>
        <option value="ocio">ocio</option>
      </select>
      <br />
      <label htmlFor="imgEvent">Imagen del evento</label>
      <input
        type="file"
        name="imgEvent"
        onChange={handleFormChange}
        value={newEvent.imgEvent}
      />
      <br />
      <label htmlFor="description">Descripción del evento</label>
      <input
        type="text"
        name="description"
        onChange={handleFormChange}
        value={newEvent.description}
      />
      <br />
      <button type="submit" onClick={handleAddEvent}>
        Crear evento
      </button>
    </form>
  );
}
