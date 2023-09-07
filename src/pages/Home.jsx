import React from "react";
import EventsShowedInHome from "../components/EventsShowedInHome";
import Login from "./Login";
import FilteredEventsFooterSearch from "../components/FilteredEventsFooterSearch";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

export default function Home() {
  const { activeUserId, userRole } = useContext(AuthContext);

  return (
    <div>
      <div className="cabeceraHome">
        <img className="logo" src="./public/forumEventsClaro.png" alt="logo" />

        {!activeUserId ?
        <Login />
      
      : null}
        
      </div>

      <hr />
      <EventsShowedInHome />
      <hr />
      <FilteredEventsFooterSearch />
    </div>
  );
}
