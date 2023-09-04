import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";

import service from "../services/service.config";

export default function UserProfile() {
  const params = useParams()
const [userDetails, setUserDetails] =useState(null)

console.log("params", params)
  useEffect(() =>{
    getData();
  }, [])

  const getData = async () => {
    try {
      const response = await service(`/users/${params.id}`);

      setUserDetails(response.data)
      console.log("userData", response.data);
    } catch (err) {
      console.log(err);
    }
  };

const  handleRefresh = () => {

getData()

}

  const handleInscription = async (eventId) => {

    let eventsUserArr = []
    userDetails.eventsAsistance.forEach((event)=> {
      eventsUserArr.push(event._id) 
    })

    console.log(eventsUserArr)
    try{
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


  if (userDetails === null) {
    return <h3>...buscando</h3>;
  }
  return (
    <div>
    
    <h1>{userDetails.username}</h1>
    {userDetails.eventsAsistance.length >0 ? userDetails.eventsAsistance.map((eachEvent)=> {
      return( 
        <div key={eachEvent._id}>
      <h3>{eachEvent.eventName}</h3>
      <img src={eachEvent.imgEvent} alt="imagen evento"  width={300}/>
       <p>{eachEvent.startDate}</p>
       <p>{eachEvent.endDate}</p>
       <Link to={`/events/${eachEvent._id}/details`} ><button>Detalles del evento</button></Link>
       <button onClick={ ()=> handleInscription(eachEvent._id)}>Date de baja del evento</button>
       </div>
      )
     }) : null}
     
    </div>
  )
 
}
