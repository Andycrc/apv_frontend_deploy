import usePacientes from "../hooks/usePacientes"

const Paciente = ({paciente}) => {
   
    const {setEdicion, eliminarPaciente} = usePacientes()

    const {email, fecha_alta, nombre, propietario, sintomas, _id} = paciente

    const formatearFecha = (fecha_alta) => {
        const nuevaFecha = new Date(fecha_alta)
        return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha)

    }


  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-700 my-2"> 
            Nombre:{' '}
            <span className="font-normal normal-case text-black">{nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2"> 
            propietario:{' '}
            <span className="font-normal normal-case text-black">{propietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2"> 
            email:{' '}
            <span className="font-normal normal-case text-black">{email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2"> 
            fecha de Alta:{' '}
            <span className="font-normal normal-case text-black">{formatearFecha(fecha_alta)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2"> 
            sintomas:{' '}
            <span className="font-normal normal-case text-black">{sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
            <button 
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 uppercase font-bold rounded-lg text-white"
            onClick={() => setEdicion(paciente)}
            >
                Editar
            </button>

            <button className="py-2 px-10 bg-red-600 hover:bg-red-700 uppercase font-bold rounded-lg text-white"
            onClick={() => eliminarPaciente(_id)}
            >
                Eliminar
            </button>

        </div>
    </div>
  )
}

export default Paciente