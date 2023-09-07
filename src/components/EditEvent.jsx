import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import { uploadImageService } from "../services/upload.services";

//BOOSTRAP
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";



export default function EditEvent() {
  const params = useParams();

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
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/events/${params.eventId}/details`);
      console.log("prueba response", response.data);
     
      setEditEvent(response.data.responseEvent);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/events/${params.eventId}/edit`, {
        editEvent, imageUrl
      });

      navigate(`/events/${params.eventId}/details`);
    } catch (error) {}
  };

  const handleFormChange = (input) => {
 

    setEditEvent({
      ...editEvent,
     
      [input.target.name]: input.target.value,
    });
  };

  if (editEvent === null) {
    return <h3>...cargando</h3>;
  }

  console.log("edit event", editEvent);
  return (
    <div className="formContainer">
          <Form>
      <FloatingLabel controlId="floatingInput" label="Nombre del evento" className="mb-3">
      
      <Form.Control
      placeholder="Nombre del evento"
        type="text"
        name="eventName"
        onChange={handleFormChange}
        value={editEvent.eventName}
      />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Fecha de inicio" className="mb-3">
     
      <Form.Control
      placeholder="Fecha de inicio"
        type="date"
        name="startDate"
        onChange={handleFormChange}
        value={editEvent.startDate}
      />

      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Fecha de finalización" className="mb-3">
      
      <Form.Control
      placeholder="Fecha de finalización"
        type="date"
        name="endDate"
        onChange={handleFormChange}
        value={editEvent.endDate}
      />
      </FloatingLabel>
      <label htmlFor="itsFree">¿Es gratuito?</label>
      <Form.Select aria-label="Default select example"
        name="itsFree"
        onChange={handleFormChange}
        value={editEvent.itsFree}
      >
        <option value='true'>si</option>
        <option value='false'>No</option>
      </Form.Select>
      <br />
      <FloatingLabel controlId="floatingInput" label="precio" className="mb-3">
      
      <Form.Control
      placeholder="precio"
        type='number'
        name="price"
        onChange={handleFormChange}
        value={editEvent.price}
      />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Capacidad" className="mb-3">
      
      <Form.Control
      placeholder="Capacidad"
        type='number'
        name="capacity"
        onChange={handleFormChange}
        value={editEvent.capacity}
      />
      </FloatingLabel>
      <label htmlFor="sector">Seleccione sector</label>
      <Form.Select aria-label="Default select example"
        name="sector"
        onChange={handleFormChange}
        value={editEvent.sector}
       > 
       
        <option value="otro">Otro</option>
        <option value="tecnológico">tecnológico</option>
        <option value="medicina">medicina</option>
        <option value="ciencia">ciencia</option>
        <option value="gastronómico">gastronómico</option>
        <option value="ocio">ocio</option>
      </Form.Select>
      <br />
      <FloatingLabel controlId="floatingInput" label="Imagen del evento" className="mb-3">
      
      <Form.Control
      placeholder="Imagen del evento"
        type="file"
        name="imgEvent"
        onChange={handleFileUpload }
        
        disabled={isUploading}
      />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Descripción del evento">
      
      <Form.Control
          as="textarea"
          placeholder="Descripción del evento"
          style={{ height: '100px' }}
        type="text"
        name="description"
        onChange={handleFormChange}
        value={editEvent.description}
      />
      </FloatingLabel>
      <Button  className="btn-admin" type="submit" onClick={handleUpdateEvent}>
        Guardar cambios
      </Button>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </Form>
    </div>

  );
}
