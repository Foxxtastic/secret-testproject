import { Descriptions, Result } from "antd"
import { formatDateTime } from "../common/conversions";
import { LoadingStatus, SecretType } from "../common/types";

type secretDetailsProps = {
    secret: SecretType | null,
    status: LoadingStatus
}

export function SecretDetails({ secret, status }: secretDetailsProps) {

    return (
        <>
            {secret !== null &&
                <Descriptions title="Secret text details" bordered>
                    <Descriptions.Item label="Hash">{secret.hash}</Descriptions.Item>
                    <Descriptions.Item label="Secret text">{secret?.secrettext}</Descriptions.Item>
                    <Descriptions.Item label="Created">{formatDateTime(secret.createdat)}</Descriptions.Item>
                    <Descriptions.Item label="Expires">{formatDateTime(secret.expiresat)}</Descriptions.Item>
                    <Descriptions.Item label="Maximum views">{secret.maximumviews}</Descriptions.Item>
                    <Descriptions.Item label="Current views">{secret.currentviews}</Descriptions.Item>
                </Descriptions>}
            {status === LoadingStatus.Failed &&
                <Result
                    status="404"
                    title="Not found"
                    subTitle="There is no secret for this hash or the secret has expired."
                />}
        </>
    )
}