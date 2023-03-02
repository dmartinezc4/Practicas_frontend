import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Formulario from "@/components/formulario"
import Grid from "@/components/grid"
import clearConst from "@/components/formulario"
const inter = Inter({ subsets: ['latin'] })

export function clearInputs(){
  document.getElementById("input_n").value = "";
  document.getElementById("input_d").value = "";
}

export function appendGrid(n,i){
  var name= n;
  var id=i;
  document.getElementById("grid_id").innerHTML +=
  "<div class=\"grid-item\" id=\"grid_val\">"+n+
  "</div><div class=\"grid-item\" id=\"grid_val\">" +i +
  "</div>";
  clearInputs();
}

function removeFirst(){
  if(document.getElementById("grid_val")==null){
    //Si no hay items en el grid no hacemos la funcion y le mandamos al user un aviso por consola de que no hay más por eliminar
    console.log("There is only the handlers")
    return;
  }
  console.log("removing");
  
  let grid = document.getElementById("grid_id");
  let node = document.getElementById("grid_val");
  console.log(node);
  
  let throwawayNode = grid.removeChild(node);
  grid = document.getElementById("grid_id");
  node = document.getElementById("grid_val");
  throwawayNode = grid.removeChild(node);
  console.log(node);
  
}


export default function Home() {

  
  return (
    <>
      <Formulario id="form_id"/> 
      
      <div className="grid-container" id="grid_id">
        <div className="grid-header">Nombre</div>
        <div className="grid-header">DNI</div>
        <div className="grid-item" id="grid_val">David</div>  
        <div className="grid-item" id="grid_val">12345678A</div>
        <div className="grid-item" id="grid_val">Jose</div>
        <div className="grid-item" id="grid_val">98765432Z</div> 
      </div>
      
      <button onClick={(e)=>removeFirst()} >Remove Top Row</button> 
    </>
  )
}

//El botón de Remove Top Row hace que se quite la primera fila del grid