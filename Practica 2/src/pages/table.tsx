import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Formulario from "@/components/formulario"
import Grid from "@/components/grid"
import clearConst from "@/components/formulario"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
/*
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
  "</div>" + "<div class=\"grid-item\" id=\"grid_val\"><button><img src=\"/papelera.png\" width=\"17\" height=\"20\"></button></div>";
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
  grid = document.getElementById("grid_id");
  node = document.getElementById("grid_val");
  throwawayNode = grid.removeChild(node);
  console.log(node);
}


*/
export default function Home() {
  
  return (
    <>

    <Link href="/"> Home</Link><br/>
      <Grid/> 
    </>
  )
}

//El botón de Remove Top Row hace que se quite la primera fila del grid