import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";

export default function UserProfile() {

  const navigate = useNavigate();

 
  const [userDetails, setUserDetails] = useState(null);
const [showDelete, setShowDelete] = useState(false)
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service("/users/userProfile");

      setUserDetails(response.data);
      console.log("userData", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = () => {
    getData();
  };

const handleShowDelete = () => {
   if (showDelete === false) {
    setShowDelete(true)
   } else {
    setShowDelete(false)
   }
}

const handleDeleteUser = async () => {
try {
  
  await service.delete("users/deleteAcount")
  navigate("/deletedUser")

} catch (error) {
  
}

}

  const handleInscription = async (eventId) => {
    let eventsUserArr = [];
    userDetails.eventsAsistance.forEach((event) => {
      eventsUserArr.push(event._id);
    });

    console.log(eventsUserArr);
    try {
      await service.put(`/events/${eventId}/inscription`, {
        eventsUserArr,
      });
      handleRefresh();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };

  if (userDetails === null) {
    return <h3>...buscando</h3>;
  }
  return (
    <div>
      <h1>Hola {userDetails.username}, bienvenido.</h1>
      <button onClick={handleShowDelete}>Eliminar cuenta</button>
      {showDelete ? 
      <div>
       <h4>¿Esta seguro de que desea eliminar su cuenta?</h4>
        <button onClick={handleDeleteUser}>Si, eliminar cuenta</button>
        <button onClick={handleShowDelete}>No, no quiero eliminar mi cuenta</button>
        </div> : null}

      {userDetails.eventsAsistance.length > 0
        ? userDetails.eventsAsistance.map((eachEvent) => {
            return (
              <div key={eachEvent._id}>
                <h3>{eachEvent.eventName}</h3>
                <img src={eachEvent.imgEvent} alt="imagen evento" width={300} />
                <p>{eachEvent.startDate}</p>
                <p>{eachEvent.endDate}</p>
                <Link to={`/events/${eachEvent._id}/details`}>
                  <button>Detalles del evento</button>
                </Link>
                <button onClick={() => handleInscription(eachEvent._id)}>
                  Date de baja del evento
                </button>
              </div>
            );
          })
        : null}
    </div>
  );
}
