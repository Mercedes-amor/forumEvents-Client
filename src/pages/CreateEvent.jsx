import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { uploadImageService } from "../services/upload.services";

//Bootstrap
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Toast from "react-bootstrap/Toast";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function CreateEvent() {
  const navigate = useNavigate();
  // CLOUDINARY
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect
  const [errorMessage, setErrorMessage] = useState("");
  // below function should be the only function invoked when the file type input changes => onChange={handleFileUpload}
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("imgEvent", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware => uploader.single("image")

    try {
      const response = await uploadImageService(uploadData);
      // or below line if not using services
      // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, uploadData)

      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {}
  };
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    itsFree: true,
    price: 0,
    capacity: 0,
    sector: "Otro",
    description: "",
    imgEvent: "",
  });

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await service.post("/events", {
        eventName: newEvent.eventName,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate,
        itsFree: newEvent.itsFree,
        price: newEvent.price,
        capacity: newEvent.capacity,
        sector: newEvent.sector,
        description: newEvent.description,
        imgEvent: imageUrl,
      });
      console.log(newEvent);
      navigate("/events");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };

  const handleFormChange = (input) => {
    setNewEvent({
      ...newEvent,
      [input.target.name]: input.target.value,
      // [imgEvent]: imageUrl
    });
    // setImageUrl()
    // handleFileUpload
  };

  return (
    <div className="formContainer">
      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="Nombre del evento"
          className="mb-3"
          htmlFor="eventName"
        >
          <Form.Control
            type="text"
            name="eventName"
            onChange={handleFormChange}
            value={newEvent.eventName}
            placeholder="Nombre del evento"
          />
        </FloatingLabel>

        <FloatingLabel
          htmlFor="startDate"
          controlId="floatingInput"
          label="Fecha inicio"
          className="mb-3"
        >
          <Form.Control
            type="date"
            name="startDate"
            onChange={handleFormChange}
            value={newEvent.startDate}
          />
        </FloatingLabel>

        <FloatingLabel
          htmlFor="endDate"
          controlId="floatingInput"
          label="Fecha finalización"
          className="mb-3"
        >
          <Form.Control
            type="date"
            name="endDate"
            onChange={handleFormChange}
            value={newEvent.endDate}
          />
        </FloatingLabel>

        <Form.Group as={Col} controlId="formItsFree">
          <Form.Label htmlFor="itsFree">¿Es gratuito?</Form.Label>
          <Form.Select
            name="itsFree"
            onChange={handleFormChange}
            value={newEvent.itsFree}
          >
            <option value="true">si</option>
            <option value="false">No</option>
          </Form.Select>
        </Form.Group>
        <Form.Label htmlFor="price">Precio:</Form.Label>
        <Form.Control
          type="Number"
          name="price"
          onChange={handleFormChange}
          value={newEvent.price}
        />

        <FloatingLabel
          htmlFor="capacity"
          label="Introducir aforo"
          className="mb-3"
        >
          <Form.Control
            type="Number"
            name="capacity"
            onChange={handleFormChange}
            value={newEvent.capacity}
            placeholder="Introducir aforo"
          />
        </FloatingLabel>

        <Form.Group as={Col} controlId="formSector">
          <Form.Label htmlFor="sector">Sector</Form.Label>
          <Form.Select
            name="sector"
            onChange={handleFormChange}
            value={newEvent.sector}
          >
            <option value="otro">Otro</option>
            <option value="tecnológico">tecnológico</option>
            <option value="medicina">medicina</option>
            <option value="ciencia">ciencia</option>
            <option value="gastronómico">gastronómico</option>
            <option value="ocio">ocio</option>
          </Form.Select>
        </Form.Group>

        {/* IMAGEN */}
        <Form.Label htmlFor="imgEvent">Imagen del evento</Form.Label>
        <Form.Control
          type="file"
          name="imgEvent"
          onChange={handleFileUpload}
          // value={imageUrl}
          disabled={isUploading}
        />
        <br />
        <FloatingLabel
          htmlFor="description"
          controlId="floatingInput"
          label="Introducir breve descripción del evento"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="description"
            onChange={handleFormChange}
            value={newEvent.description}
          />
        </FloatingLabel>

        <Button className="btn-admin" type="submit" onClick={handleAddEvent}>
          Crear evento
        </Button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </Form>
    </div>
  );
}
