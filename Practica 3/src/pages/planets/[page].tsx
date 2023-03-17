



//Este es el archivo que se supone que tiene que funcionar
export async function getServerSideProps(props:ServerSideProps){
    const page=props.params.page;
    
    try{        
        //El id es la página del planeta
        const res=await fetch(`https://swapi.py4e.com/api/planets/${page}`);
        console.log(res);
        const json=await res.json();
        return {props:json};
    }catch(error){
        console.log("Server Error")
    }
}