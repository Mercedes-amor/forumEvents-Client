import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";

export default function EventsList() {
  const [allEventsList, setAllEventsList] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/events");
      console.log(response);
      setAllEventsList(response.data);
      console.log(allEventsList)
    } catch (error) {
      console.log(error);
      // Navigate("/error")
    }
  };

  if(allEventsList === null ) {
    return <h3>...cargando</h3>}

  return (
    <div>
      {allEventsList.map((eachEvent) => {
        return (
          <div key={eachEvent._id}>
            <img src={eachEvent.imgEvent} alt="Imagen Evento" />
            <h3>{eachEvent.eventName}</h3>
            <p>{eachEvent.sector}</p>
            <p>
              {eachEvent.startDate.slice(0,10)} - {eachEvent.endDate.slice(0,10)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
