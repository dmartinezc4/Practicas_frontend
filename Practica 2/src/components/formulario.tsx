import { useState } from "react";
import styled from "styled-components"
import{ appendGrid} from "@/pages/index"

const Formulario = ()=>{
    const [nombre,setNombre]=useState<string>("");//variable para el nombre
    const [dni,setDni]=useState<string>("");//variable para el dni
    
    
    return(
        <>
         Introduce tu nombre: <input type="string" id="input_n" onBlur={(e)=>setNombre(String(e.target.value))}/>
         
         Introduce tu dni: <input type="string" id="input_d" onBlur={(e)=>setDni(String(e.target.value))}/>

         <button onClick={(e)=>appendGrid(nombre,dni)} >Añadir</button> 
        

        </>
    )
}





export default Formulario;