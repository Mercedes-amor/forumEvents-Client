import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import ciencia from  "../assets/ciencia.png"
import pizza from "../assets/pizza.png"
import  tec from "../assets/tec.png"
import medicina from "../assets/medicina.png"
import otros from "../assets/otros.png"
import entretenimiento from "../assets/entretenimiento.png"

export default function FilteredEventsFooterSearch() {


    



  return (


    <div >

        <h3>Todos los sectores</h3>
    
    <Link to="/events/tecnológico" ><Button><img src={tec} alt="logo" width={35}/>tecnológico</Button></Link>
    <Link to="/events/medicina" ><Button><img src={medicina} alt="logo" width={35}/> medicina</Button></Link>
    <Link to="/events/ciencia" ><Button><img src={ciencia} alt="logo" width={35}/> ciencia</Button></Link>
    <Link to="/events/gastronómico" ><Button><img src={pizza} alt="logo" width={35}/> gastronómico</Button></Link>
    <Link to="/events/ocio" ><Button><img src={entretenimiento} alt="logo" width={35}/> ocio</Button></Link>
    <Link to="/events/Otro" ><Button><img src={otros} alt="logo" width={35}/> Otro</Button></Link>
  
   
  </div>


  )
}

