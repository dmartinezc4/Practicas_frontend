import { gql } from "@apollo/client";
import getApolloClient from "@/libs/client"
import { GetServerSideProps, NextPage } from "next";
import Image from 'next/image'


export const getServerSideProps:GetServerSideProps = async(context) =>{

    const { id }= context.query;

    const query= gql`
        query character($id:ID!){ 
         character(id:$id) {
            image
            name
            location{
              name
            }
            gender
            episode{
              id
            }
         }
    }
    `
    const client= getApolloClient();
    const {data}= await client.query<{
        character:{
            image:string
            name:string
            location:string
            gender:string
            episode:[string]
        }
    }>({
        query,
        variables:{
            id
        }
    });

    return {
        props: {
            image: data.character.image,
            name: data.character.name,
            location: data.character.location,
            gender: data.character.gender,
            episodes: data.character.episode
            
        }
    }
    
}

const Page:NextPage<{name:string,image:string,location:string,gender:string,episodes:[string]}> = (props:{name:string,image:string,location:string,gender:string,episodes:[string]}) =>{
    return(
    <>
        
        Image: <Image src={props.image} alt={props.name} width={100} height={100}/><br/>
        Name: {props.name}<br/>
        Location: <br/>
        Gender: {props.gender}<br/>
        Episode: <br/>
    </>
    )
}
export default Page;