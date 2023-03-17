import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';


type ServerSideProps = {
    params:{
        url:string;
    }
}


type PlanetProps={
    id:number,
    name:string,
    rotation_period:number,
    orbital_period:number,
    diameter:number,
    climate:string,
    gravity:string,
    terrain:string,
    surface_water:number,
    population:number,
    residents:string[],
    films:string[],
    created:string,
    edited:string,
    url:string,
}


export async function getServerSideProps(props:ServerSideProps){
 
    try{
        
        const id=props.params.id;
        //El id es la página del planeta
        const res=await fetch(`https://swapi.py4e.com/api/planets/${id}`);
        const json=await res.json();
        console.log(json);
        const json2=json;
        return {props:json2};
    }catch(error){
        console.log("Server Error")
    }
}



const Planet=(props: PlanetProps)=>{
    return(
        <>
        <Link href={"/"}>Ir a lista</Link><br/>
        <br/>
        <h1>{props.name}</h1>
        <br/>
        Periodo de rotacion: {props.rotation_period}
        <br/>
        Periodo orbital: {props.orbital_period}
        <br/>
        Diametro: {props.diameter}
        <br/>
        Clima: {props.climate}
        <br/>
        Gravedad: {props.gravity}
        <br/>
        Terreno: {props.terrain}
        <br/>
        Agua en Superficie: {props.surface_water}
        <br/>
        Poblacion: {props.population}
        <br/>
        <h2>Residentes:</h2> {props.residents}
        <h3><br/></h3>
        <h2>Peliculas:</h2> {props.films}
        <h3><br/></h3>
        Creado: {props.created}
        <br/>
        Editado: {props.edited}
        </>
    )
}

export default Planet;