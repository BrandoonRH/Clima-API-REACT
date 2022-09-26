import { useState } from "react";
import useClima from "../hooks/useClima"

const form = () => {

  const [alert, setAlert] = useState('')
  const {busqueda, dataBusqueda, concultarClima } = useClima();

  const {city, country } = busqueda

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if(Object.values(busqueda).includes('')){
      setAlert('Todos los Campos son Obligatorios')
      return
    }
    setAlert('')
    concultarClima(busqueda);
  }

  return (
    <div className='contenedor'>
      {alert && <p>{alert}</p>}
        <form onSubmit={handleSubmit}>
            <div className='campo'>
              <label htmlFor="city">Ciudad: </label>
              <input type="text" name="city" id="city" onChange={dataBusqueda} value={city}/>
            </div>
            <div className='campo'>
              <label htmlFor="country">País: </label>
             <select name="country" id="country" onChange={dataBusqueda} value={country}>
                <option value="">--Seleccione País--</option>
                <option value="US">Estados Unidos</option>
                <option value="ES">España</option>
                <option value="MX">México</option>
                <option value="CO">Colombia</option>
                <option value="AR">Argentina</option>
             </select>
            </div>
            <input type="submit" value="Consultar Clima"/>
        </form>
    </div>
  )
}

export default form