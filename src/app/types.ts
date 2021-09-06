import { SecretType } from "../common/types";

export type SecretDetailsResponse = {
    data: {
        secretByHash: SecretType
    }
}

export type SecretInputType = {
    secretText: string,
    expiresAt: string,
    remainingViews: number
}