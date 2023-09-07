import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import service from "../services/service.config";

//Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function EventsList() {

 const params = useParams()
 console.log(params)
  

  const [allEventsList, setAllEventsList] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [queryInput, setQueryInput] = useState(params.query);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [queryInput]);

  const handleSearch = (event) => {
    console.log(event.target.value);

    setQueryInput(event.target.value);

    handleRefresh();
  };

  const getData = async () => {
    try {
      const response = await service.get(`/events/${queryInput}`);
      console.log(response);
      setAllEventsList(response.data.eventData);
      console.log(allEventsList);

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
            <div className="containerZoom">
            <Card className="divCardList"  key={eachEvent._id}>
              <Card.Img
                variant="top"
                src={eachEvent.imgEvent}
                alt="Imagen Evento"
                width={300}
              />
              <Card.Body >
                <Card.Title>{eachEvent.eventName}</Card.Title>
                <Card.Text>
                  <p>Sector: {eachEvent.sector}</p>
                  <p>Aforo disponible: {eachEvent.capacity}</p>
                  <p>Fecha inicio: {eachEvent.startDate.slice(0, 10)}</p>
                  <p>Fecha fin: {eachEvent.endDate.slice(0, 10)}</p>
                </Card.Text>

                <Link to={`/events/${eachEvent._id}/details`}>
                  <Button variant="primary">Detalles</Button>
                </Link>
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
