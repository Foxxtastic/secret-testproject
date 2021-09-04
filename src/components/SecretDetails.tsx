import { Descriptions, Result } from "antd"
import { convertToLocalDate } from "../common/convertions";
import { LoadingStatus, SecretType } from "../common/types";

type secretDetailsProps = {
    secret: SecretType | null,
    status: LoadingStatus
}

export function SecretDetails({ secret, status }: secretDetailsProps) {

    console.log(status);

    return (
        <>
            {secret !== null &&
                <Descriptions title="Secret text details" bordered>
                    <Descriptions.Item label="Hash">{secret.hash}</Descriptions.Item>
                    <Descriptions.Item label="Secret text">{secret?.secrettext}</Descriptions.Item>
                    <Descriptions.Item label="Created">{convertToLocalDate(secret.createdat)}</Descriptions.Item>
                    <Descriptions.Item label="Expires">{convertToLocalDate(secret.expiresat)}</Descriptions.Item>
                    <Descriptions.Item label="Remaining views">{secret.remainingviews}</Descriptions.Item>
                </Descriptions>}
            {status === LoadingStatus.Failed &&
                <Result
                    status="404"
                    title="Not found"
                    subTitle="There is no secret for this hash."
                />}
        </>
    )
}