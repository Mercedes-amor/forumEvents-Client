import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";

export default function EventsList() {
  const [allEventsList, setAllEventsList] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [queryInput, setQueryInput] = useState("todos");
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
      <div>
        <form>
          <label htmlFor="query">filtra eventos por categoria</label>

          <select onChange={handleSearch} name="select">
            <option value="todos" selected>
              todos
            </option>
            <option value="Otro">Otro</option>
            <option value="tecnológico">tecnológico</option>
            <option value="medicina">medicina</option>
            <option value="ciencia">ciencia</option>
            <option value="gastronómico">gastronómico</option>
            <option value="ocio">ocio</option>
          </select>

          {/* <label htmlFor="startDate">Fecha de Inicio</label>
          <input
            type="date"
            name="startDate"
            onChange={handleSearch}
            value={startDate}
          />
          <label htmlFor="endtDate">Fecha de finalización</label>
          <input
            type="date"
            name="endDate"
            onChange={handleSearch}
            value={endDate}
          /> */}
        </form>
      </div>

      <div>
        {allEventsList.map((eachEvent) => {
          return (
            <div key={eachEvent._id}>
              <img src={eachEvent.imgEvent} alt="Imagen Evento" width={300} />
              <h3>{eachEvent.eventName}</h3>
              <p>{eachEvent.sector}</p>
              <p>Aforo disponible:{eachEvent.capacity}</p>
              <p>
                {eachEvent.startDate.slice(0, 10)} -{" "}
                {eachEvent.endDate.slice(0, 10)}
              </p>

              <Link to={`/events/${eachEvent._id}/details`}>Detalles</Link>
              {/* <button onClick={() => handleInscription(eachEvent._id, eachEvent.capacity)}>Inscribirse/ Cancelar inscripción</button> */}

              {errorMessage ? <p>{errorMessage}</p> : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
