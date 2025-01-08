import React from "react";
import { useState } from "react";

//Componente para renderizar mensajes de alertas en los mismos componentes
export default function Alert({isMessageAlert, typeProp, messageAlert}) {
    

    //Documentación simple del componente 
    /**True = ver
     * Flase = no ver
     */

    if(!isMessageAlert){
        return null
    }

    //Elegir el color del mensaje 
    // #155724: exito 
    // #826404: advertencia
    // #721C24: peligro
   let colorClass = ''
   switch (typeProp) {
    case "exito":
      colorClass = "text-colorExito bg-green-100 border-green-500";
      break;
    case "advertencia":
      colorClass = "text-colorAdvertencia bg-yellow-100 border-yellow-500";
      break;
    case "peligro":
      colorClass = "text-colorPeligro bg-red-100 border-red-500";
      break;
    default:
      colorClass = "text-gray-700 bg-gray-100 border-gray-500";
      break;
  }

    
    return(
        <div className={`p-1  ${colorClass}`}>
            <p>{messageAlert}</p>
        </div>
    )

}