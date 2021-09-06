import { SecretType } from "../common/types";

export type SecretDetailsResponse = {
    data: {
        secretByHash: SecretType
    }
}

export type SecretInputType = {
    secretText: string,
    expiresAt: number,
    remainingViews: number
}

export type SecretCreateResponse = {
    data: {
        create_secret: SecretType
    }
}