import { SecretType } from "../common/types";

export type SecretDetailsResponse = {
    data: {
        secretByHash: SecretType
    }
}