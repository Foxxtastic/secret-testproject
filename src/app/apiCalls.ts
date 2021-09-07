import { SecretCreateResponse, SecretDetailsResponse, SecretInputType } from "./types";

const baseUrl = "http://localhost:8000/graphql"

export const apiError = "error";

const handleError = () => {
    return apiError as typeof apiError;
}


const getData = (hash: string) => {
    return JSON.stringify({
        query: `query {
                    secretByHash(hash: "${hash}"){
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

const createData = (secret: SecretInputType) => {
    return JSON.stringify({
        query: `mutation {
                    create_secret: createSecret(input: {secrettext: "${secret.secretText}", expiresat: ${secret.expiresAt}, remainingviews: ${secret.remainingViews}}) {
                        secret {
                            id
                            hash
                            secrettext
                            createdat
                            expiresat
                            remainingviews
                        }
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
        .then(res => {
            if (res.data?.secretByHash === null) {
                throw new Error(`No secret with ${hash}`);
            }
            return res
        })
        .catch(handleError)
}

export const createSecretFetch = (secretInput: SecretInputType) => {
    return fetch(`${baseUrl}`, {
        credentials: 'same-origin',
        method: 'POST',
        body: createData(secretInput),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json() as Promise<SecretCreateResponse>)
        .then(res => {
            if (res.data?.create_secret === null) {
                throw new Error(`Secret not created`);
            }
            return res
        })
        .catch(handleError)
}
