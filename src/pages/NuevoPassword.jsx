import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setpasswordModificado] = useState(false)

  const [alerta, setAlerta] = useState({});
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/api/veterinarios/reset-password/${token}`);
        setAlerta({ msg: "Coloca tu Nuevo password", tipo: "success" });

        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: "Hubo un error con el enlace", tipo: "error" });
      }
    };

    comprobarToken();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no coinciden, Verifícalas.",tipo: "error"});
      return;
    }

    if(password.length < 6){
      setAlerta({ msg: "La contraseña debe tener al menos 6 caracteres.", tipo: "error" });
      return
    }

    try {

      const url = `/api/veterinarios/reset-password/${token}`
      const {data} = await clienteAxios.post(url, {password})
      setAlerta({ msg: data.msg, tipo: "success" });

       // Limpiar los inputs
       setPassword("")
       setRepetirPassword("")
       setpasswordModificado(true)
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, tipo: "error" });
    }
  };


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y no Pierdas Acceso a {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      {/* Componente de Alert */}
      <Alerta alerta={alerta} />
      {tokenValido && (
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          

          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Nuevo Password
              </label>
              <input
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                type="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Repetir Password
              </label>
              <input
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                type="Password"
                placeholder="Password"
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)}
              />
            </div>

            <input
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
              type="submit"
              value="Guardar Nuevo Password"
            />
            
          </form>
          {passwordModificado && 
            <Link className="block text-center my-5 text-gray-500 " to="/">
            Inicia Sesión
           </Link>
          }
          
          
          
        </div>
      )}
    </>
  );
};

export default NuevoPassword;
