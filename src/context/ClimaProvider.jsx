import { useState, createContext } from "react";
import axios from "axios";
const ClimaContext = createContext(); 

const ClimaProvider = ({children}) => {
    //console.log(import.meta.env.VITE_API_KEY)
    const [busqueda, setBusqueda ] = useState({
        city: '',
        country: ''
    })
    const [cargando, setCargando] = useState(false)
    const [noResultado, setNoResultado] = useState(false);
    const [result, setResult] = useState({})
    const dataBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }
const concultarClima = async(datas) => {
    setCargando(true)
    setNoResultado(false)
    try {
        const {city, country } = datas; 
        const appId = import.meta.env.VITE_API_KEY; 
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${appId}`; 
        const {data} = await axios(url); 
        const {lat, lon } = data[0]
        const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
        const { data: clima } = await axios(urlClima);
        setResult(clima) 
       
    } catch (error) {
        setNoResultado('No se Encontraron Resultados');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontro la Ciudad que Ingresaste',
            footer: '<a href="https://www.clima.com/">Consulta más Información aquí</a>'
          })
    } finally {
        setCargando(false)
    }
}


    return (
            <ClimaContext.Provider
                value={{
                       busqueda,
                       dataBusqueda,
                       concultarClima,
                       result,
                       cargando,
                       noResultado 
                }}
            >
                {children}
            </ClimaContext.Provider>
    )
}
export {
    ClimaProvider
}
export default ClimaContext