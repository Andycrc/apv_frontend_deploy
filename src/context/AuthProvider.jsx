import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";


const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true)
    const [auth, setauth] = useState({})


    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('apv_token')   
            if(!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios('/api/veterinarios/perfil', config)
                setauth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setauth({})
            }

            setCargando(false)

        }
        autenticarUsuario()
    }, [])

    const cerrarSesion  = () => {
        localStorage.removeItem('apv_token')
        setauth({})
    }
    
    const actualizarPerfil = async(datos) => {
        const token = localStorage.getItem('apv_token')   
        if(!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {               
            const {data} = await clienteAxios.put(`/api/veterinarios/perfil/${datos._id}`,datos, config)
            return{
                msg: 'Almacenado Correctamente',
                tipo: 'success'
            }
        } catch (error) {
           return{
            msg: error.response.data.msg,
            tipo: 'error'
           }               
        }
    }

    const guardarPassword = async(datos) => {
        const token = localStorage.getItem('apv_token')   
        if(!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {               
            const {data} = await clienteAxios.put(`/api/veterinarios/actualizar-password`, datos, config)
            return{
                msg: 'Alctualizado Correctamente',
                tipo: 'success'
            }
           
        } catch (error) {
            return{
                msg: error.response.data.msg,
                tipo: 'error'
            }
        }
    }
    
    return(
        <AuthContext.Provider value={{auth, setauth, cargando, cerrarSesion, actualizarPerfil, guardarPassword}}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
} 

export default AuthContext