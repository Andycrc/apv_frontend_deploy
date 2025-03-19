import React, { useEffect } from "react";
import Swal from "sweetalert2";

const Alerta = ({ alerta }) => {
  useEffect(() => {
    if (alerta?.msg) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: alerta.tipo || "info", // Puede ser 'success', 'error', 'warning', 'info'
        title: alerta.msg,
      });
    }
  }, [alerta]); // Se ejecuta cada vez que `alerta` cambia

  return null; // No se muestra nada en el DOM
};



export default Alerta;
