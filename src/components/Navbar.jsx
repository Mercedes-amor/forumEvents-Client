import { Link, useNavigate, useParams } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function Navbar() {
  const { activeUserId, userRole } = useContext(AuthContext);
  const params = useParams();
  return (
    <div>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>

        {!activeUserId ? (
          <>
            <Link to="/signup">
              <button>signup</button>
            </Link>

            <Link to="/login">
              <button>login</button>
            </Link>
          </>
        ) : null}

        {activeUserId ? (
          <>
            <Link to="/userId">
              <button>Perfil</button>
            </Link>
            <Link to="/events">
              <button>Eventos</button>
            </Link>

            <Link to="/logout"><button>Logout</button></Link>
          </>
        ) : null}

        {userRole === "admin" ? (
          <Link to="/events/create-event">
            <button>Crear evento</button>
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
