export enum LoadingStatus {
    Idle,
    Loading,
    Failed
}

export type SecretType = {
    id: number,
    hash: string,
    secrettext: string,
    createdat: string,
    expiresat: string,
    remainingviews: number
}