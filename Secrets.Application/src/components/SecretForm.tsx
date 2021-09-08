import { Input, Form, Button, Row, Col, Divider, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '../hooks/useQuery';
import { useAppSelector } from '../app/hooks';
import { getSecretByHash, selectSecret, selectStatus } from '../features/secret/secretSlice';
import { PageContainer } from './PageContainer';
import { SecretDetails } from './SecretDetails';
import { LoadingStatus } from '../common/types';

const layout = {
    wrapperCol: { span: 16 },
};

export function SecretForm() {

    const [form] = Form.useForm();
    const hash = useQuery().get("hash");

    const secretDetails = useAppSelector(selectSecret);
    const status = useAppSelector(selectStatus);
    const dispatch = useDispatch();

    const isLoading = status === LoadingStatus.Loading;

    useEffect(() => {
        if (hash !== undefined && hash !== null) {
            dispatch(getSecretByHash(hash));
        }
    }, [hash, dispatch])

    const onFinish = (value: any) => {
        dispatch(getSecretByHash(value.hash));
    }

    return (
        <PageContainer>
            <Row align="top" justify="center" style={{ marginBottom: "2em" }}><Title children="Retrieve secret" /></Row>
            {isLoading && <Row justify="center"><Spin /></Row>}
            <Row align="middle" justify="center">
                <Col span={8}>
                    <Form {...layout} form={form} name="secret-retrieve" layout="vertical" onFinish={onFinish}>
                        <Form.Item name="hash" label="Hash" rules={[{ required: true }]} initialValue={hash && hash}>
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={isLoading}> Get Secret </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                </Col>
            </Row>
            <Row align="middle" justify="center" style={{ padding: "2em" }}>
                <SecretDetails secret={secretDetails} status={status} />
            </Row>
        </PageContainer >
    )
}