import { useState } from "react";
import styled from "styled-components"
import Image from 'next/image'

const Grid = () => {
    const [nombre, setNombre] = useState<string>("");
    const [dni, setDNI] = useState<string>("");
    const [numFilas, setFilas] = useState<number>(0);

    const isDNI = (dni: string): boolean => {
        const formato = /^[0-9]{8,8}[A-Za-z]$/;
      
        if(formato.test(dni)==false){
          console.log("DNI invalido, ejemplo de DNI valido:12345678A")
        }else{
          return formato.test(dni);
        }
        
    }
    
    const addRow = () => {
        const tabla = document.getElementById("grid");
        if(tabla != null){
            setFilas(numFilas+1);
            tabla.innerHTML += `
            <div id=\"grid_val\">${nombre}</div><div id=\"grid_val\">${dni}</div>
            <button>
                <img src="/papelera.png" id=\"grid_val\"  width="17" height="20"/>
            </button>
        `;
        }
      }

    return(
        <>

            Introduce un nombre: <input id="nombre" type="text" value={nombre} onChange = {(e) => setNombre(e.target.value)}/><br/>
            Introduce un DNI: <input id="dni" type="text" value={dni} onChange = {(e) => setDNI(e.target.value)}/><br/>
            <button onClick={(e)=>{if((nombre && dni) && isDNI(dni)) addRow()}} ><img src="/añadir.png" id="grid_val"  width="20" height="20"/></button><br/>

            <DivTabla filas={numFilas} id = "grid">
            </DivTabla><br/>
            
        </>
    );
}

type TablaProps = {
    filas: number
}

const DivTabla = styled.div<TablaProps>`
    display: inline-grid;
    border: 1px solid black;
    background-color: #cdcdcd;
    grid-template-columns: 200px 200px 30px;
    grid-template-rows: repeat(${props => props.filas}, 30px);
`

export default Grid;