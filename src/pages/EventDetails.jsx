import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import CreateSession from "../components/CreateSession";
import EditSession from "../components/EditSession";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

import PaymentIntent from "../components/PaymentIntent";

export default function EventDetails() {
  const { activeUserId, userRole } = useContext(AuthContext);
  console.log("userId", activeUserId);
  const params = useParams();

  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [isEditSessionShowing, setIsEditSessionhowing] = useState();
  const [eventsUserArr, setEventsUserArr] = useState(null);
  const [usersArrayInEvent, setusersArrayInEvent] = useState(null);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);
  console.log("usersArrayInEvent", usersArrayInEvent);
  // console.log(isEditSessionShowing)
  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log("params", params);
      const response = await service.get(`/events/${params.eventId}`);
      setEventsUserArr(response.data.userData.eventsAsistance);
      let userArr = [];
      response.data.usersArrayInEvent.forEach((e) => {
        userArr.push(e._id);
      });
      setusersArrayInEvent(userArr);
      console.log("response", response);
      setEventDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowForm = () => {
    if (isFormShowing === true) {
      setIsFormShowing(false);
    } else {
      setIsFormShowing(true);
    }
  };

  const handleEventDelete = async () => {
    try {
      await service.delete(`/events/${params.eventId}`);
      navigate(`/events`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    // setIsLoading(true)
    console.log("Se ejecuta?");
    getData();
  };

  const handleShowEditSession = (sessionIdEditing) => {
    setIsEditSessionhowing(sessionIdEditing);

    console.log(sessionIdEditing);
    // if (isEditSessionShowing === eachSession._id) {
    //   setIsEditSessionhowing(eachSession._id);
    // } else {
    //   setIsEditSessionhowing(true);
    // }
  };
  const handleJoinSession = async (sessionId, assistants, capacityHall) => {
    try {
      await service.put(
        `/events/${params.eventId}/sessions/${sessionId}/join`,
        {
          assistants,
          capacityHall,
        }
      );
      handleRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSessionDelete = async (sessionId) => {
    try {
      await service.delete(`/events/${params.eventId}/sessions/${sessionId}`);
      handleRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInscription = async () => {
    try {
      console.log(eventsUserArr);
      await service.put(
        `/events/${eventDetails.responseEvent._id}/inscription`,
        {
          eventsUserArr,
        }
      );

      handleRefresh();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };
  if (eventDetails === null) {
    return <h3>...cargando</h3>;
  }

  return (
    <div key={eventDetails.responseEvent._id}>
      <div>
        <img
          src={eventDetails.responseEvent.imgEvent}
          alt="Imagen Evento"
          width={300}
        />
        <h3>{eventDetails.responseEvent.eventName}</h3>
        <p>{eventDetails.responseEvent.sector}</p>
        <p>
          {eventDetails.responseEvent.startDate.slice(0, 10)} -{" "}
          {eventDetails.responseEvent.endDate.slice(0, 10)}
        </p>
        {eventDetails.responseEvent.price > 0 ? (
          <p>Precio: {eventDetails.responseEvent.price / 100}€</p>
        ) : null}

        <p>
          Plazas disponibles:{" "}
          {eventDetails.responseEvent.capacity - usersArrayInEvent.length}
        </p>
        {userRole === "admin" ? (
          <div>
            <Link to={`/events/${params.eventId}`}>
              {" "}
              <button>Modificar</button>{" "}
            </Link>
            <button onClick={handleEventDelete}>Eliminar</button>
          </div>
        ) : null}

        {eventDetails.responseEvent.itsFree ? (
          <button
            onClick={() =>
              handleInscription(
                eventDetails.responseEvent._id,
                eventDetails.responseEvent.capacity
              )
            }
          >
            {usersArrayInEvent.includes(activeUserId) ? (
              <p>Date de baja del evento</p>
            ) : (
              <p>Apuntate al evento</p>
            )}
          </button>
        ) : (
          <div>
            {showPaymentIntent === false ? (
              <button onClick={() => setShowPaymentIntent(true)}>
                Purchase
              </button>
            ) : (
              <PaymentIntent productDetails={eventDetails.responseEvent} />
            )}
          </div>
        )}
      </div>
      {eventDetails.sessionsArray.map((eachDay, i) => {
        console.log("eachDay", eachDay);
        return (
          <div key={i}>
            <h3>Sesiones Día: {i + 1}</h3>
            {eachDay.map((eachSession, i) => {
              return (
                <div key={eachSession._id}>
                  {isEditSessionShowing == eachSession._id.toString() ? (
                    <div>
                      <EditSession
                        sessionId={eachSession._id}
                        eventId={params.eventId}
                        setIsEditSessionhowing={setIsEditSessionhowing}
                        handleRefresh={handleRefresh}
                        eachSession={eachSession}
                      />
                      <button onClick={() => handleShowEditSession(null)}>
                        cerrar formulario
                      </button>
                    </div>
                  ) : (
                    <div key={eventDetails.responseSession._id}>
                      <h2>Nombre: {eachSession.sessionName}</h2>
                      <p>Descripción: {eachSession.description}</p>
                      <p>Día: {eachSession.day}</p>
                      <p>Fecha: {eachSession.dateSession}</p>
                      <p>Sala: {eachSession.hall}</p>
                      <p>
                        plazas disponibles:{" "}
                        {eachSession.capacityHall -
                          eachSession.assistants.length}
                      </p>

                      {eachSession.isAvailable && (
                        <Link
                          to={`/events/${params.eventId}/${eachSession._id}/${activeUserId}`}
                        >
                          <button>Reservar sesión</button>
                        </Link>
                      )}

                      {eachSession.hostedBy !== activeUserId ? (
                        <button
                          onClick={() =>
                            handleJoinSession(
                              eachSession._id,
                              eachSession.assistants,
                              eachSession.capacityHall
                            )
                          }
                        >
                          {eachSession.assistants.includes(activeUserId) ? (
                            <p>Date de baja de la sesión</p>
                          ) : (
                            <p>Apuntate a la sesión</p>
                          )}
                        </button>
                      ) : (
                        <p>Eres el host actual de esta sesión</p>
                      )}

                      {userRole === "admin" ? (
                        <div>
                          <button
                            onClick={() =>
                              handleShowEditSession(eachSession._id.toString())
                            }
                          >
                            Editar sesión
                          </button>
                          <button
                            onClick={() => handleSessionDelete(eachSession._id)}
                          >
                            Borrar sesión
                          </button>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      {userRole === "admin" ? (
        <div>
          <button onClick={handleShowForm}>Crear sesión</button>

          {isFormShowing ? (
            <CreateSession
              params={params.eventId}
              setIsFormShowing={setIsFormShowing}
              handleRefresh={handleRefresh}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
