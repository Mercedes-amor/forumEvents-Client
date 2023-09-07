import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <div className="enlacesFooter" >
        <Link to={"/"}>
          <p>Home</p>
        </Link>
        <Link to={"/userProfile"}>
          <p>Perfil</p>
        </Link>
        <Link to={"/events/todos"}>
          <p>Eventos</p>
        </Link>
        <Link to={"/signup"}>
          <p>Registrate</p>
        </Link>
        <Link to={"/login"}>
          <p>Logueate</p>
        </Link>
      </div>
<div>
    <h3>by Mercedes Amor and Lucas Navarro</h3>
</div>
      
    </div>
  );
}
