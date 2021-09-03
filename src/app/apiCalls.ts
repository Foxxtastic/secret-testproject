import { SecretDetailsResponse } from "./types";

const baseUrl = "http://localhost:8000/graphql"

export const apiError = "error";

const handleError = () => {
    return apiError as typeof apiError;
}


const getData = (hash: string) => {
    return JSON.stringify({
        query: `query{
                    secretByHash(hash: "1mekjd"){
                    id,
                    hash,
                    secrettext,
                    createdat,
                    expiresat,
                    remainingviews
                    }
                }`
    });
}

export const getSecretDetails = (hash: string) => {
    return fetch(`${baseUrl}`, {
        credentials: 'same-origin',
        method: 'POST',
        body: getData(hash),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json() as Promise<SecretDetailsResponse>)
        .catch(handleError)
}