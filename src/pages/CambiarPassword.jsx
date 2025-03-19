import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";


const CambiarPassword = () => {

  const {guardarPassword} = useAuth()

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo:'',
    pwd_repetir: ''
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if(Object.values(password).some(campo => campo === '')){
      setAlerta({ msg: "Todos los campos son obligatorios", tipo: "error"});
      return;
    }

    if (password.pwd_nuevo !== password.pwd_repetir) {
      setAlerta({ msg: "Las contraseñas no coinciden, Verifícalas.",tipo: "error"});
      return;
    }

    if(password.pwd_nuevo.length  < 6){
      setAlerta({ msg: "La contraseña debe tener al menos 6 caracteres.", tipo: "error" });
      return
    }
    
    const respuesta = await guardarPassword(password)
    setAlerta(respuesta)

  };

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Password
      </h2>
      <p className="text-xl mt-5 mb-10 font-bold text-center">
        Modifica tu {""}
        <span className="text-indigo-600 font-bold">Password aqui</span>
      </p>

      <Alerta alerta={alerta}/>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                 Password Actual
              </label>
              <input
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                type="Password"
                name="pwd_actual"
                placeholder="Password"           
                onChange={(e) => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                 Nuevo password Password 
              </label>
              <input
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                type="Password"
                name="pwd_nuevo"
                placeholder="Password"
                onChange={(e) => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Repetir Password
              </label>
              <input
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                type="Password"
                name="pwd_repetir"
                placeholder="Password"
                onChange={(e) => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>

            <input
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
              type="submit"
              value="Guardar Cambios"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
