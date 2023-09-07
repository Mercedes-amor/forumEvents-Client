import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export default function Navbar() {
  const { activeUserId, userRole } = useContext(AuthContext);
  const params = useParams();
  const { verifyToken } = useContext(AuthContext);

  const handlelogout = async (e) => {
    e.preventDefault();

    try {
      localStorage.removeItem("authToken");

      await verifyToken();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Nav fill variant="tabs" defaultActiveKey="/home" className="me-auto">
      <Nav.Item>
        <Link className="linkNav" to="/">
          Home
        </Link>
      </Nav.Item>

      {!activeUserId ? (
        <>
          <Nav.Item>
            <Link className="linkNav" eventKey="link-1" to="/signup">
              signup
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link className="linkNav" eventKey="link-2" to="/login">
              Login
            </Link>
          </Nav.Item>
        </>
      ) : null}
      {userRole === "admin" ? (
        <Nav.Item>
          <Link className="linkNav" to="/events/create-event">
            Crear evento
          </Link>
        </Nav.Item>
      ) : null}

      {activeUserId ? (
        <>
          <Nav.Item>
            <Link className="linkNav" to="/userProfile">
              Perfil
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="linkNav" to="/events/todos">
              Eventos
            </Link>
          </Nav.Item>
          <Button className="buttomLogout"  onClick={handlelogout}>Logout</Button>
        </>
      ) : null}
    </Nav>
  );
}
