import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";

//Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function EventsList() {
  const { activeUserId, userRole } = useContext(AuthContext);
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
      if (response.data.eventData.length > 6) {
        let randomEvents = [];

        for (let i = 0; i < 6; ) {
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
            i++;
          }
        }
        setFilteredEvents(randomEvents);
      } else {
        setFilteredEvents(response.data.eventData);
      }

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
      <h3>Algunos de nuestros eventos actuales</h3>
      <div className="extContainer">
        {filteredEvents.map((eachEvent) => {
          return (
            <div className="containerZoom" key={eachEvent._id}>
              <Card className="divCardList">
                <Card.Img
                  className="cardImg"
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
                  {!activeUserId ? (
                    <Link to={"/login"}>
                      Inicia sesión para ver los detalles
                    </Link>
                  ) : (
                    <Link to={`/events/${eachEvent._id}/details`}>
                      <Button variant="primary">Detalles</Button>
                    </Link>
                  )}
                  {errorMessage ? <p>{errorMessage}</p> : null}
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}
