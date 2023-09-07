import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";

import { AuthContext } from "../context/auth.context";

//BOOSTRAP
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

function Login() {
  const { verifyToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await service.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("authToken", response.data.authToken);

      await verifyToken();
      navigate("/userProfile");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };

  return (
    <div className="formContainer">
      <Form onSubmit={handleLogin}>
        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
          <Form.Control
            placeholder="Email:"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Password"
          className="mb-3"
        >
          <Form.Control
          placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FloatingLabel>
        

        <Button type="submit" >Login</Button>
        <br />
        <br />
        <Link to={"/signup"} >¿Aún no tienes cuenta?, Registrate aquí.</Link>

        {errorMessage ? <p>{errorMessage}</p> : null}
      </Form>
    </div>
  );
}

export default Login;
