import {ApolloClient, InMemoryCache} from "@apollo/client";
import {NormalizedCacheObject} from "@apollo/client/cache";

/*
const client = new ApolloClient({
    uri: "https://googl.com",
    cache: new InMemoryCache(),
})
*/




const CSRClient = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
});

const getClient=()=>{
    if(typeof window === 'undefined'){
        return new ApolloClient({
            uri: "https://rickandmortyapi.com/graphql",
            cache: new InMemoryCache(),
        })
    }else{
        return CSRClient;
    }

}

export default getClient;
