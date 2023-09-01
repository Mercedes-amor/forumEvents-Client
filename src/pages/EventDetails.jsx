import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";

export default function EventDetails() {

  const params = useParams();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] =useState(null)

useEffect(() => {
  getData()
},[])

const getData = async () => {
  try {
    console.log("params", params)

    const response = await service.get(`/events/${params.eventId}`);
    console.log("response",response);
    setEventDetails(response.data);
  } catch (error) {
    console.log(error);

  }
};

const handleEventDelete = async () =>{
try {
  await service.delete(`/events/${params.eventId}`)
  navigate(`/events`);
} catch(error) {
  console.log(error)
}
}
if(eventDetails === null ) {
  return <h3>...cargando</h3>}

  return (
 

          <div key={eventDetails.responseEvent._id}>
            <img src={eventDetails.responseEvent.imgEvent} alt="Imagen Evento" />
            <h3>{eventDetails.responseEvent.eventName}</h3>
            <p>{eventDetails.responseEvent.sector}</p>
            <p>
              {eventDetails.responseEvent.startDate.slice(0,10)} - {eventDetails.responseEvent.endDate.slice(0,10)}
            </p>

            <Link to={`/events/${params.eventId}`}> <button>Modificar</button> </Link>
             <button onClick={handleEventDelete}>Eliminar</button> 
          </div>

  
  )
}
