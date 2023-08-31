import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

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

  if (userDetails === null) {
    return <h3>...buscando</h3>;
  }
  return (
    <div>
    <h1>{userDetails.username}</h1>

    </div>
  )
}
