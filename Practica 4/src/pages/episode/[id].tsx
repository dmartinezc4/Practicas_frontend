import { gql } from "@apollo/client";
import getApolloClient from "@/libs/client"
import { GetServerSideProps, NextPage } from "next";


export const getServerSideProps:GetServerSideProps = async(context) =>{

    const { id }= context.query;

    const query= gql`
        query episode($id:ID!){ 
            episode(id:$id){
                name
                air_date
                characters{
                    name
                }
            }
        }
    `
    const client= getApolloClient();
    const {data}= await client.query<{
        episode:{
            name:string
            air_date:string
            characters:[string]
        }
    }>({
        query,
        variables:{
            id
        }
    });

    return {
        props: {
            name: data.episode.name,
            air_date: data.episode.air_date,
            characters: data.episode.characters,           
        }
    }
    
}

const Page:NextPage<{name:string,air_date:string,characters:[string]}> = (props:{name:string,air_date:string,characters:[string]}) =>{
    return(
    <>
        Name: {props.name}<br/>
        Air_date: {props.air_date}<br/>
        Residents: <br/>

    </>
    )
}
export default Page;