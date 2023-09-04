import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";

export default function EventsList() {
  const [allEventsList, setAllEventsList] = useState(null);
  const [eventsUserArr, setEventsUserArr] = useState(null)
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/events");
      console.log(response);
      setAllEventsList(response.data.eventData);
      console.log(allEventsList)
      setEventsUserArr(response.data.userData.eventsAsistance)
      console.log(response.data.userData.eventsAsistance)
    } catch (error) {
      console.log(error);
      // Navigate("/error")
    }
  };

  const handleInscription = async (eventId) => {
    try{
      console.log(eventsUserArr)
     await service.put(`/events/${eventId}/inscription`, {
    
        eventsUserArr
      })
 
      handleRefresh()
    } catch(error) {
      console.log(error)
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }

    

  }

  const handleRefresh = () =>{
    getData()
  }
  if(allEventsList === null ) {
    return <h3>...cargando</h3>}

  return (
    <div>
      {allEventsList.map((eachEvent) => {
        return (
          
          <div key={eachEvent._id}>
            <img src={eachEvent.imgEvent} alt="Imagen Evento" width={300}/>
            <h3>{eachEvent.eventName}</h3>
            <p>{eachEvent.sector}</p>
            <p>Aforo disponible:{eachEvent.capacity}</p>
            <p>
              {eachEvent.startDate.slice(0,10)} - {eachEvent.endDate.slice(0,10)}
            </p>

            <Link to={`/events/${eachEvent._id}/details`}>Detalles</Link>
            <button onClick={() => handleInscription(eachEvent._id, eachEvent.capacity)}>Inscribirse/ Cancelar inscripción</button>
            
            {errorMessage ? <p>{errorMessage}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
