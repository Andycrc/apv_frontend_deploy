import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import Alerta from "../components/Alerta";



const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({ msg: "Todos los campos son obligatorios", tipo: "error" });
      return
    }

    if(password !== repetirPassword){
      setAlerta({ msg: "Las contraseñas no coinciden, Verifícalas.", tipo: "error" });
      return
    }

    if(password.length < 6){
      setAlerta({ msg: "La contraseña debe tener al menos 6 caracteres.", tipo: "error" });
      return
    }

    //Crear usuario con la API
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`
      await axios.post(url, {nombre, email, password})

      setAlerta({ 
        msg: "¡Registro exitoso! Revisa tu email para confirmar la cuenta.", 
        tipo: "success" 
      });      
    } catch (error) {
      setAlerta({msg: error.response.data.msg,  tipo: "error"})
    }
   
  }


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {/* Componente de Alert */}
        <Alerta alerta={alerta}/>

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="email"
              placeholder="Email de Registro"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="Password"
              placeholder="Password"
              value={password}
              onChange={e => setPassowrd(e.target.value)}
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
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
            type="submit"
            value="Crear Cuenta"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi Password</Link>
            </nav>
      </div>
    </>
  );
};

export default Registrar;
