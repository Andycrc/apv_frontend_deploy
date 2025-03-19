import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from './../hooks/usePacientes';

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
  
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})


    const {guardarPaciente, paciente} = usePacientes()
   
    useEffect(() => {
        setNombre(paciente?.nombre || '');
        setPropietario(paciente?.propietario || '');
        setEmail(paciente?.email || '');
       

        setSintomas(paciente?.sintomas || '');
        setId(paciente?._id || null);
    }, [paciente]);
    

    const handleSubmit = (e) => {
        e.preventDefault()

        if([nombre, propietario, email, sintomas].includes('')){
            setAlerta({msg: 'Todos los campos son obligatorios', tipo:'error'})
            return
        }

        guardarPaciente({nombre, propietario, email, sintomas, id})
        setAlerta({msg: 'Guardado Correctamente', tipo:'success'})
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
    }
  return (
   <>
    <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

   <p className="text-xl mt-5 mv-10 text-center">
            Añade tus pacientes y {""}
            <span className="text-indigo-600 font-bold">Administralos</span>
    </p>


    <Alerta alerta={alerta}/>
    <form onSubmit={handleSubmit} className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md'>
        <div className='mb-5'>
            <label htmlFor='mascota' className='text-gray-700 font-bold'>Nombre Mascota</label>
            <input type="text"
                id='mascota'                         
                placeholder='Nombre de la Mascota'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label htmlFor='propietario' className='text-gray-700 font-bold'>Nombre Propietario</label>
            <input type="text"
                id='propietario'                         
                placeholder='Nombre del propietario'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={propietario}
                onChange={e => setPropietario(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label htmlFor='email' className='text-gray-700 font-bold'>Email Propietario</label>
            <input type="email"
                id='email'                         
                placeholder='Email del propietario'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
      

        <div className='mb-5'>
            <label htmlFor='sintomas' className='text-gray-700 font-bold'>Sintomas</label>
            <textarea
                id='sintomas'                         
                placeholder='Describe los sintomas'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={sintomas}
                onChange={e => setSintomas(e.target.value)}
            />
        </div>

        <input
            className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 transition-colors"
            type="submit"
            value={id ? 'Guardar Cambios': "Agregar Paciente"}
          />

    </form>
   </>
  )
}

export default Formulario