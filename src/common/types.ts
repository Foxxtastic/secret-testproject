export enum LoadingStatus {
    Idle,
    Loading,
    Failed
}

export type SecretType = {
    id: number,
    hash: string,
    secretText: string,
    createdAt: Date,
    expiresAt: Date,
    remainingViews: number
}