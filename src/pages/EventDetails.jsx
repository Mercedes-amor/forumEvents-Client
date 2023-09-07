import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import CreateSession from "../components/CreateSession";
import EditSession from "../components/EditSession";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

import PaymentIntent from "../components/PaymentIntent";

//Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

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
      const response = await service.get(`/events/${params.eventId}/details`);
      console.log("este es el response jesus", response);
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
      <Card>
        <Card.Img
          variant="top"
          src={eventDetails.responseEvent.imgEvent}
          alt="Imagen Evento"
          width={500}
        />
        <Card.Body className="cardEvent">
          <Card.Title>{eventDetails.responseEvent.eventName}</Card.Title>
          <Card.Text>
            <p>Sector: {eventDetails.responseEvent.sector}</p>
            <p>{eventDetails.responseEvent.description}</p>
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
          </Card.Text>
          {userRole === "admin" ? (
            <div>
              <Link to={`/events/${params.eventId}`}>
                <Button className="buttonDetails">Modificar</Button>
              </Link>
              <Button onClick={handleEventDelete}>Eliminar</Button>
            </div>
          ) : null}
      {userRole === "admin" ? (
        <div>
          <Button className="btn-primary" onClick={handleShowForm}>
            Crear nueva sesión
          </Button>

          {isFormShowing ? (
            <CreateSession
              params={params.eventId}
              setIsFormShowing={setIsFormShowing}
              handleRefresh={handleRefresh}
            />
          ) : null}
        </div>
      ) : null}
          {eventDetails.responseEvent.itsFree ? (
            <Button
              variant="outline-dark"
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
                <p className="buttonGreen">Apuntate al evento</p>
              )}
            </Button>
          ) : (
            <div>
              {showPaymentIntent === false ? (
                !usersArrayInEvent.includes(activeUserId) ? (
                  <Button onClick={() => setShowPaymentIntent(true)}>
                    Purchase
                  </Button>
                ) : (
                  <p>Ya has realizado la compra para este evento</p>
                )
              ) : (
                <PaymentIntent productDetails={eventDetails.responseEvent} />
              )}
            </div>
          )}
        </Card.Body>
      </Card>
      <div className="extContainer">
        {eventDetails.sessionsArray.map((eachDay, i) => {
          console.log("eachDay", eachDay);

          return (
            <div className="containerDay" key={i}>
              {/* <div > */}
              <h3 className="dayCard"> Día {i + 1}</h3>
              {/* </div> */}

              {eachDay.map((eachSession, i) => {
                return (
                  <div className="divCard" key={eachSession._id}>
                    {isEditSessionShowing == eachSession._id.toString() ? (
                      <div>
                        <EditSession
                          sessionId={eachSession._id}
                          eventId={params.eventId}
                          setIsEditSessionhowing={setIsEditSessionhowing}
                          handleRefresh={handleRefresh}
                          eachSession={eachSession}
                        />
                        <Button onClick={() => handleShowEditSession(null)}>
                          cerrar formulario
                        </Button>
                      </div>
                    ) : (
                      <Card
                        className="divCard"
                        key={eventDetails.responseSession._id}
                      >
                        <Card.Body className="cardSession">
                          <Card.Title>
                            Sesión: {eachSession.sessionName}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            <p>
                              <b>Fecha:</b> {eachSession.dateSession}{" "}
                            </p>
                          </Card.Subtitle>
                          <p>
                            Sala: <b>{eachSession.hall}</b> - Plazas restantes:{" "}
                            <b>
                              {eachSession.capacityHall -
                                eachSession.assistants.length}
                            </b>
                          </p>

                          <Card.Text>{eachSession.description}</Card.Text>

                          {eventsUserArr.includes(params.eventId) === true &&
                            eachSession.isAvailable && (
                              <Link
                                to={`/events/${params.eventId}/${eachSession._id}/${activeUserId}`}
                              >
                                <Button className="button">
                                  Reservar sesión
                                </Button>
                              </Link>
                            )}

                          {eventsUserArr.includes(params.eventId) === true &&
                          eachSession.hostedBy &&
                          eachSession.hostedBy !== activeUserId ? (
                            <Button
                              className="button"
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
                            </Button>
                          ) : (
                            <p>
                              {eachSession.hostedBy === activeUserId
                                ? "Eres el host actual de esta sesión"
                                : null}
                            </p>
                          )}

                          {userRole === "admin" ? (
                            <div>
                              <Button
                                className="button"
                                onClick={() =>
                                  handleShowEditSession(
                                    eachSession._id.toString()
                                  )
                                }
                              >
                                Editar sesión
                              </Button>
                              <Button
                                className="button"
                                onClick={() =>
                                  handleSessionDelete(eachSession._id)
                                }
                              >
                                Borrar sesión
                              </Button>
                            </div>
                          ) : null}
                        </Card.Body>
                      </Card>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

    </div>
  );
}
