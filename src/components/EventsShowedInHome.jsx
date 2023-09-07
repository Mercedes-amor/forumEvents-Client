import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";

//Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function EventsList() {
 
  const [filteredEvents, setFilteredEvents] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [queryInput, setQueryInput] = useState("todos");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);



  const getData = async () => {
    try {
      const response = await service.get(`/events/${queryInput}`);
      console.log(response);
      let randomEvents = [];
      for (let i = 0; i < 6;) {
        let randomEvent =
          response.data.eventData[
            Math.floor(Math.random() * response.data.eventData.length)
          ];
        if (randomEvents.includes(randomEvent)) {
          randomEvent =
            response.data.eventData[
              Math.floor(Math.random() * response.data.eventData.length)
            ];
        } else {
          randomEvents.push(randomEvent);
          i++
        }
      }
      setFilteredEvents(randomEvents);

      console.log(filteredEvents);

      setIsLoading(false);
      // setEventsUserArr(response.data.userData.eventsAsistance)
      // console.log(response.data.userData.eventsAsistance)
    } catch (error) {
      console.log(error);
      // Navigate("/error")
    }
  };

  const handleRefresh = () => {
    getData();
  };
  // if (allEventsList === null) {
  //   return <h3>...cargando</h3>;
  // }
  if (isLoading) {
    return <h3>...cargando</h3>;
  }

  return (
    <>
    
      <div className="extContainer">
        {filteredEvents.map((eachEvent) => {
          return (
            <Card className="divCardList" key={eachEvent._id}>
              <Card.Img
                variant="top"
                src={eachEvent.imgEvent}
                alt="Imagen Evento"
                width={300}
              />
              <Card.Body>
                <Card.Title>{eachEvent.eventName}</Card.Title>
                <Card.Text>
                  <p>Sector: {eachEvent.sector}</p>
                  <p>Aforo disponible: {eachEvent.capacity}</p>
                  <p>Fecha inicio: {eachEvent.startDate.slice(0, 10)}</p>
                  <p>Fecha fin: {eachEvent.endDate.slice(0, 10)}</p>
                </Card.Text>

                <Link to={"/login"}>Inicia sesión para ver los detalles</Link>
              

                {errorMessage ? <p>{errorMessage}</p> : null}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
}
