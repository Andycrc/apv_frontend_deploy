import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import useAuth from './../hooks/useAuth';



const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const {auth} = useAuth()
    
    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                    
                const token = localStorage.getItem('apv_token')
                if(!token)return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                } 

                const {data} = await clienteAxios('/api/pacientes', config)
                setPacientes(data)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [auth])


    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('apv_token')   
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }       

        if(paciente.id){

            try {
               
              const {data} = await clienteAxios.put(`/api/pacientes/${paciente.id}`, paciente, config)
               
              const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
              setPacientes(pacientesActualizados)


            } catch (error) {
                console.log(error.response.data.msg)
            }

        }else{
            try {

                const {data} = await clienteAxios.post('/api/pacientes', paciente, config)
               
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
               setPacientes([pacienteAlmacenado, ...pacientes])
        
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

      
    }

    const setEdicion = (paciente) => {
       setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {
        let estadoConfirmacion = false;
    
        // Esperamos a que el usuario responda la alerta
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, confirmar",
            cancelButtonText: "Cancelar"
        });
    
        // Verificamos el resultado de la respuesta
        if (result.isConfirmed) {
            estadoConfirmacion = true;  // El usuario confirmó
            Swal.fire("Confirmado", "Tu acción ha sido ejecutada.", "success");
        } else {
            estadoConfirmacion = false;  // El usuario canceló
            Swal.fire("Cancelado", "No se realizó ninguna acción.", "info");
        }
         
        if (estadoConfirmacion) {
            const token = localStorage.getItem('apv_token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
    
            try {
                const { data } = await clienteAxios.delete(`/api/pacientes/${id}`, config);
                
                const pacientesActualizados = pacientes.filter(pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    };
    

    return(
       <PacientesContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente
        }}
       >
        {children}
       </PacientesContext.Provider> 
    )
}



export default PacientesContext;