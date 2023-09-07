import React from 'react'
import EventsShowedInHome from "../components/EventsShowedInHome"
import Login from './Login'
export default function Home() {
  return (
    <div>
      <img className="logo" src='./public/forumEvents alargado.png' alt="logo"/>
      <Login />
     <EventsShowedInHome />
    </div>
  )
}
