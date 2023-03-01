import { useState } from "react";
import styled from "styled-components"

const Grid = ()=>{
    const [nombre,setNombre]=useState<string>("");//variable para el nombre
    const [dni,setDni]=useState<string>("");//variable para el dni
    
    //Aqui está lo que sería la tabla base (Nombre, Dni y 2 ejemplos)
    return(
        <>
        
         <div className="grid-container">
        <div className="grid-header">Nombre</div>
        <div className="grid-header">DNI</div>
        <div className="grid-item">David</div>  
        <div className="grid-item">12345678A</div>
        <div className="grid-item">Jose</div>
        <div className="grid-item">98765432Z</div>  
 
      </div>

        

        </>
    )
}





export default Grid;