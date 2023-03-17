import Link from "next/link";
import { useState,useEffect } from "react";

type PlanetType={
    id:number,
    name:string,
    url:string,
}

const Formulario = ()=>{
    const [data,setData]=useState<PlanetType[]>([]);
    const [name,setName]=useState<string>("");
    const [page,setPage]=useState<number>(1);
    /*
    const fecthAllPlanets=async()=>{
        const planets=await fetch(`https://swapi.py4e.com/api/planets/?page=${page}`);
        const json=await planets.json();
        const names=json.results.map((planet:any)=>planet.name);
        const result=json.results.map((planet:any)=>({id:planet.id,name:planet.name,url:planet.url}));
        
    }*/

    const fetchData =async()=>{
        try {
        const planets = await fetch(`https://swapi.py4e.com/api/planets/?page=${page}`);
        const json=await planets.json();
        const result=json.results.map((planet:any)=>({name:planet.name,url:planet.url}));
        result.map((planet: { url: any; })=>{
            let url1=planet.url;
            let result= url1.substring(35); 
            console.log(result)
            planet.url=result;
          })
        setData(result);
        } catch (error) {
            console.log("Not next or not prev")
        setData([{id:0,name:"Error al bajarme los planetas",}]);
        }
    }

    useEffect(()=>{
        fetchData();        
    },[page])

    

    if(data.length===0){
        return(
        <>
            Loading Planet List
        </>
        )
        
    }

    
   
    if(page==1){//first
        return(<>
            {data.map(item=>(<Link href={`/planet/${item.url}`}>{item.name}<br/></Link>))}

            <button onClick={()=>setPage(page+1)}>Next</button>

            </>
        )
    }else if(page==7){//Last
        return(<>
            {data.map(item=>(<Link href={`/planet/${item.url}`}>{item.name}<br/></Link>))}

            <button onClick={()=>setPage(page-1)}>Prev</button>            

            </>
        )
    }else{//In between
        return(<>
            {data.map(item=>(<Link href={`/planet/${item.url}`}>{item.name}<br/></Link>))}

            <button onClick={()=>setPage(page+1)}>Next</button>
            <button onClick={()=>setPage(page-1)}>Prev</button>

            </>
        )
    }





}




export default Formulario;