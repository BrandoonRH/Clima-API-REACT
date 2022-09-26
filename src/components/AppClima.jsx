import Form from "./Form"
import Result from "./Result"
import Loading from "./Loading"
import useClima from "../hooks/useClima"

const AppClima = () => {

  const {result, cargando, noResultado } = useClima(); 

  return (
    <>
    <main className='dos-columnas'>
        <Form/>
        { cargando ? <Loading/> : 
        result?.name ? <Result/> :
        noResultado ? <p>{noResultado}</p> : 
        <p>El Clima se Muestra Aquí</p>
        } 
    </main>
    </>
  )
}

export default AppClima