import { Input, Form, Button, Row, Col, Divider } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { getSecretByHash, selectSecret, selectStatus } from '../features/secret/secretSlice';
import { PageContainer } from './PageContainer';
import { SecretDetails } from './SecretDetails';

const layout = {
    wrapperCol: { span: 16 },
};

export function SecretForm() {

    const [form] = Form.useForm();

    const secretDetails = useAppSelector(selectSecret);
    const status = useAppSelector(selectStatus);
    const dispatch = useDispatch();

    const onFinish = (value: any) => {
        dispatch(getSecretByHash(value.hash));
    }

    return (
        <PageContainer>
            <Row align="top" justify="center" style={{ marginBottom: "2em" }}><Title children="Retrieve secret" /></Row>
            <Row align="middle" justify="center">
                <Col span={8}>
                    <Form {...layout} form={form} name="secret-retrieve" layout="vertical" onFinish={onFinish}>
                        <Form.Item name="hash" label="Hash" rules={[{ required: true }]} >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"> Get Secret </Button>
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