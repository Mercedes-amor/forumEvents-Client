import axios from "axios";

const service = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

// configuracion que en todas las llamadas al backend se busque el Token en el navegador y se envie
service.interceptors.request.use((config)=>{

// buscar el token

const  storedToken = localStorage.getItem("authToken")

if (storedToken) {
    config.headers.Authorization = `Bearer ${storedToken}`
}
// lo añadimos a la configuracion
// retornamos el config

return config

})



export default service