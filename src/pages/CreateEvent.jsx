import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { uploadImageService } from "../services/upload.services";

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
      
    } catch (error) {
      
    }
  };
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    itsFree: true,
    capacity: 0,
    sector: "Otro",
    description: "",
    imgEvent:"",
  });

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await service.post("/events", { 
        eventName: newEvent.eventName,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate,
        itsFree: newEvent.itsFree,
        capacity: newEvent.capacity,
        sector: newEvent.sector,
        description: newEvent.description,
        imgEvent:imageUrl,
      });
      console.log(newEvent)
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
    <form>
      <label htmlFor="eventName">Nombre del evento</label>
      <input
        type="text"
        name="eventName"
        onChange={handleFormChange}
        value={newEvent.eventName}
      />
      <br />
      <label htmlFor="startDate">Fecha de inicio</label>
      <input
        type="date"
        name="startDate"
        onChange={handleFormChange}
        value={newEvent.startDate}
      />
      <br />
      <label htmlFor="endtDate">Fecha de finalización</label>
      <input
        type="date"
        name="endDate"
        onChange={handleFormChange}
        value={newEvent.endDate}
      />
      <br />
      <label htmlFor="itsFree">¿Es gratuito?</label>
      <select
        name="itsFree"
        onChange={handleFormChange}
        value={newEvent.itsFree}
      >
        <option value="true">si</option>
        <option value="false">No</option>
      </select>
      <br />
      <label htmlFor="capacity">Capacidad</label>
      <input
        type="Number"
        name="capacity"
        onChange={handleFormChange}
        value={newEvent.capacity}
      />
      <br />
      <label htmlFor="sector">Sector</label>
      <select name="sector" onChange={handleFormChange} value={newEvent.sector}>
        <option value="otro">Otro</option>
        <option value="tecnológico">tecnológico</option>
        <option value="medicina">medicina</option>
        <option value="ciencia">ciencia</option>
        <option value="gastronómico">gastronómico</option>
        <option value="ocio">ocio</option>
      </select>
      <br />
      {/* IMAGEN */}
      <label htmlFor="imgEvent">Imagen del evento</label>
      <input
        type="file"
        name="imgEvent"
        onChange={handleFileUpload}
        // value={imageUrl}
        disabled={isUploading}
      />
      <br />
      <label htmlFor="description">Descripción del evento</label>
      <input
        type="text"
        name="description"
        onChange={handleFormChange}
        value={newEvent.description}
      />
      <br />
      <button type="submit" onClick={handleAddEvent}>
        Crear evento
      </button>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
  );
}
