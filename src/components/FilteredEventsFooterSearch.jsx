import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";

export default function FilteredEventsFooterSearch() {


    



  return (


    <div >

        <h3>Todos los sectores</h3>
    
    <Link to="/events/tecnológico" ><Button><img src="public\techno-heart.png" alt="logo" width={35}/>tecnológico</Button></Link>
    <Link to="/events/medicina" ><Button><img src="public\doctor-20-regular.png" alt="logo" width={35}/> medicina</Button></Link>
    <Link to="/events/ciencia" ><Button><img src="public\materials-science.png" alt="logo" width={35}/> ciencia</Button></Link>
    <Link to="/events/gastronómico" ><Button><img src="public\food-pizza-20-regular.png" alt="logo" width={35}/> gastronómico</Button></Link>
    <Link to="/events/ocio" ><Button><img src="public\entertainment-party-popper-hobby-entertainment-party-popper-confetti-event.png" alt="logo" width={35}/> ocio</Button></Link>
    <Link to="/events/Otro" ><Button><img src="public\other-admission-outline.png" alt="logo" width={35}/> Otro</Button></Link>
  
   
  </div>


  )
}

