import { useEffect, useState } from "react"
import { useParams, useNavigate  } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada]  =useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})
  const navigate = useNavigate();

  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/api/veterinarios/confirmar/${id}`
        const {data} = await clienteAxios(url)
        setCuentaConfirmada(true)
        setAlerta({ msg: data.msg, tipo: "success" });      

       
        setTimeout(() => {
          navigate("/"); 
        }, 3200);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          tipo: "error"
        })
      }

      setCargando(false)
    }
    confirmarCuenta()
  }, [navigate])


  return (
    <>
    <div className="w-full md:col-span-2 text-center">
      <h1 className="text-indigo-600 font-black text-6xl">
       Confirma tu Cuenta y Comienzar a Administrar{" "}
        <span className="text-black">los Pacientes</span>
      </h1>
    </div>

     {!cargando &&
        <Alerta alerta={alerta}/>
     }

     
       
    </>
  )
}

export default ConfirmarCuenta