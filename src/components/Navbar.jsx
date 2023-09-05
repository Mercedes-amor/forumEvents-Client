import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function Navbar() {
  const { activeUserId, userRole } = useContext(AuthContext);
  const params = useParams();

  const handleLogout = async () => {
    try {
      await service.post(`/auth/logout`);
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };
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
            <Link to="/userProfile">
              <button>Perfil</button>
            </Link>
            <Link to="/events">
              <button>Eventos</button>
            </Link>

            <button onClick={handleLogout}>Logout</button>
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
