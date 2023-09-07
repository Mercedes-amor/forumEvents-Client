import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";

//Bootstrap
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Toast from "react-bootstrap/Toast";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await service.post("/auth/signup", {
        username,
        email,
        password,
        confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
      //    else {
      //     navigate("/error");
      //   }
    }
  };

  return (
    <div className="formContainer">
          <Form onSubmit={handleSignup}>
      <FloatingLabel
        controlId="floatingInput"
        label="username"
        className="mb-3"
      >
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
      </FloatingLabel>
      <br />

      <FloatingLabel
        controlId="floatingInput"
        label="email"
        className="mb-3"
      >
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="name@example.com"
        />
      </FloatingLabel>
      <br />

      <FloatingLabel
        controlId="floatingInput"
        label="password"
        className="mb-3"
      >
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
      </FloatingLabel>
      <br />
      <FloatingLabel
        controlId="floatingInput"
        label="confirmPassword"
        className="mb-3"
        placeholder="Password"
      >
        <Form.Control
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm password"
        />
      </FloatingLabel>
      <br />

      <Button type="submit" variant="info">
        Signup
      </Button>

      {errorMessage ? <p>{errorMessage}</p> : null}
    </Form>
    </div>

  );
}

export default Signup;
