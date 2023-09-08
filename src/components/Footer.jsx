import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>

      <div className="enlacesFooter" >
        <Link className="linkFooter" to={"/"}>
          <p>Home</p>
        </Link>
        <Link className="linkFooter" to={"/userProfile"}>
          <p>Perfil</p>
        </Link>
        <Link className="linkFooter" to={"/events/todos"}>
          <p>Eventos</p>
        </Link>
        <Link className="linkFooter" to={"/signup"}>
          <p>Registrate</p>
        </Link>
        <Link className="linkFooter" to={"/login"}>
          <p>Logueate</p>
        </Link>
      </div>
      
<div>
    <p className="footerP"> &copy; Mercedes Amor & Lucas Navarro</p>
</div>
      
    </div>
  );
}
