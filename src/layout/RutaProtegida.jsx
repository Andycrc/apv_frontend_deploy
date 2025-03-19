import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Footer from './../components/Footer';
import Header from './../components/Header';

const AdminLayout = () => {

  const {auth, cargando} = useAuth()

  if(cargando) return ''

  return (
   <>
       
       {/* Operador ternario */}
    <Header/>
      {auth?._id ?  

      (
      <main className='container mx-auto mt-10'>
         <Outlet/> 
      </main>
      )
      

      : <Navigate to="/"/>}
    <Footer/>
    
   
   </>
  )
}

export default AdminLayout