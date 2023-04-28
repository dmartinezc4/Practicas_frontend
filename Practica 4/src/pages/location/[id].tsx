import { gql } from "@apollo/client";
import getApolloClient from "@/libs/client"
import { GetServerSideProps, NextPage } from "next";


export const getServerSideProps:GetServerSideProps = async(context) =>{

    const { id }= context.query;

    const query= gql`
        query location($id:ID!){ 
            location(id:$id){
                name
                dimension
                residents{
                    name
                }
            }
        }
    `
    const client= getApolloClient();
    const {data}= await client.query<{
        location:{
            name:string
            dimension:string
            residents:[string]
        }
    }>({
        query,
        variables:{
            id
        }
    });

    return {
        props: {
            name: data.location.name,
            dimension: data.location.dimension,
            residents: data.location.residents,           
        }
    }
    
}

const Page:NextPage<{name:string,dimension:string,residents:[string]}> = (props:{name:string,dimension:string,residents:[string]}) =>{
    return(
    <>
        Name: {props.name}<br/>
        Dimension: {props.dimension}<br/>
        Residents: <br/>

    </>
    )
}
export default Page;