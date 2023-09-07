import React from 'react'
import EventsShowedInHome from "../components/EventsShowedInHome"
import Login from './Login'
import FilteredEventsFooterSearch from '../components/FilteredEventsFooterSearch'
export default function Home() {
  return (
    <div>
      <img className="logo" src='./public/forumEvents alargado.png' alt="logo"/>
      <Login />
      <hr />
     <EventsShowedInHome />
     <hr />
     <FilteredEventsFooterSearch /> 
    </div>
  )
}
