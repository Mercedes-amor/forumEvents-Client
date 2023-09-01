import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";

export default function EditEvent() {
  const params = useParams();

  const navigate = useNavigate();

  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/events/${params.eventId}`);
console.log("prueba response",response.data)
      setEditEvent(response.data.responseEvent);
      
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/events/${params.eventId}`, { editEvent });

      navigate(`/events/${params.eventId}/details`);
    } catch (error) {}
  };

  const handleFormChange = (input) => {
    setEditEvent({
      ...editEvent,
      [input.target.name]: input.target.value,
    });
  };

  if(editEvent === null ) {
    return <h3>...cargando</h3>}

    console.log("edit event", editEvent)
  return (
  
    <form>
      <label htmlFor="eventName">Nombre del evento</label>
      <input
        type="text"
        name="eventName"
        onChange={handleFormChange}
        value={editEvent.eventName}
      />
      <br />
      <label htmlFor="startDate">Fecha de inicio</label>
      <input
        type="date"
        name="startDate"
        onChange={handleFormChange}
        value={editEvent.startDate}
      />

      <br />
      <label htmlFor="endtDate">Fecha de finalización</label>
      <input
        type="date"
        name="endDate"
        onChange={handleFormChange}
        value={editEvent.endDate}
      />
      <br />
      <label htmlFor="itsFree">¿Es gratuito?</label>
      <select
        name="itsFree"
        onChange={handleFormChange}
        value={editEvent.itsFree}
      >
        <option value="true">si</option>
        <option value="false">No</option>
      </select>
      <br />
      <label htmlFor="capacity">Capacidad</label>
      <input
        type="Number"
        name="capacity"
        onChange={handleFormChange}
        value={editEvent.capacity}
      />
      <br />
      <label htmlFor="sector">Sector</label>
      <select
        name="sector"
        onChange={handleFormChange}
        value={editEvent.sector}
      >
        <option value="otro">Otro</option>
        <option value="tecnológico">tecnológico</option>
        <option value="medicina">medicina</option>
        <option value="ciencia">ciencia</option>
        <option value="gastronómico">gastronómico</option>
        <option value="ocio">ocio</option>
      </select>
      <br />
      {/* <label htmlFor="imgEvent">Imagen del evento</label>
      <input
        type="file"
        name="imgEvent"
        onChange={handleFormChange}
        value={editEvent.imgEvent}
      /> */}
      <br />
      <label htmlFor="description">Descripción del evento</label>
      <input
        type="text"
        name="description"
        onChange={handleFormChange}
        value={editEvent.description}
      />
      <br />
      <button type="submit" onClick={handleUpdateEvent}>
        Guardar cambios
      </button>
    </form>
  );
}