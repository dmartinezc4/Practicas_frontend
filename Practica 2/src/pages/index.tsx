import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Formulario from "@/components/formulario"
import Grid from "@/components/grid"
const inter = Inter({ subsets: ['latin'] })

export function appendGrid(n,i){
  var name= n;
  var id=i;
  document.getElementById("grid_id").innerHTML +=
  "<div class=\"grid-item\">"+n+
  "</div><div class=\"grid-item\">" +i +
  "</div>"
}


export default function Home() {

  
  return (
    <>
      <Formulario id="form_id"/> 
      
      <div className="grid-container" id="grid_id">
        <div className="grid-header">Nombre</div>
        <div className="grid-header">DNI</div>
        <div className="grid-item">David</div>  
        <div className="grid-item">12345678A</div>
        <div className="grid-item">Jose</div>
        <div className="grid-item">98765432Z</div> 
      </div>
      
    
    </>//Que haga un item grid aunque esté fuera de la tabla
  )
}
