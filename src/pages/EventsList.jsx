import { useContext, useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";

import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
//Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";


export default function EventsList() {
  const { activeUserId, userRole } = useContext(AuthContext);

  const params = useParams();
  //  console.log(params)
  const Navigate = useNavigate();

  const [allEventsList, setAllEventsList] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [params]);

  const handleSearch = (event) => {
    // console.log(event.target.value);

    Navigate(`/events/${event.target.value}`);
  };

  const getData = async () => {
    try {
      const response = await service.get(`/events/${params.query}`);
      // console.log(response);
      setAllEventsList(response.data.eventData);
      // console.log(allEventsList);

      setIsLoading(false);
      // setEventsUserArr(response.data.userData.eventsAsistance)
      // console.log(response.data.userData.eventsAsistance)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
      // console.log(error);
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
    return <Spinner animation="border" className="spinnerColor" />;
  }

  return (
    <>
      <div className="formContainer">
        <Form>
          <label htmlFor="sector">Filtre por sector</label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleSearch}
            name="select"
          >
            <option value="todos">todos</option>
            <option value="Otro">Otro</option>
            <option value="tecnológico">tecnológico</option>
            <option value="medicina">medicina</option>
            <option value="ciencia">ciencia</option>
            <option value="gastronómico">gastronómico</option>
            <option value="ocio">ocio</option>
          </Form.Select>
        </Form>
      </div>

      <div className="extContainer">
        {allEventsList.map((eachEvent) => {
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
                  {/* <button onClick={() => handleInscription(eachEvent._id, eachEvent.capacity)}>Inscribirse/ Cancelar inscripción</button> */}

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
