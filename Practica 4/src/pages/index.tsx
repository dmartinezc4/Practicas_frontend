import { gql } from "@apollo/client";
import getApolloClient from "@/libs/client"

export const getServerSideProps = async() =>{



  const query= gql`
      query character($id:ID!){ 
        character(id:$id) {
        name
      }
    }
    `
  const client= getApolloClient();
  const {data}= await client.query<{
    character:{
      name:string
    }
  }>({
    query,
    variables:{
      id:"4"
    }
  });

  return {
    props: {
      name: data.character.name
    }
  }
  
}


export default function Home(props:{name:string}){
  return(
  <>
  Utiliza /characters para tener una lista<br/>
  Utiliza /characters/id para un personaje<br/>
  Utiliza /location/id para una localizacion<br/>
  Utiliza /episode/id para un episodio<br/>
  </>
  )
}
