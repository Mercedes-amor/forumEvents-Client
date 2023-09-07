import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <div>
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
        <h4>Contacta con nosotros</h4>
      </div>
    </div>
  );
}
