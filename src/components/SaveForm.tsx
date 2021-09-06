import { Input, Form, Button, Row, Col, Divider, InputNumber, Spin, message } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { LoadingStatus } from '../common/types';
import { createSecret, selectSecret, selectStatus } from '../features/secret/secretSlice';
import { PageContainer } from './PageContainer';

type FormInputsType = {
    secretText: string,
    expiresAt: number,
    remainingViews: number
}

export function SaveForm() {

    const [form] = Form.useForm();
    const status = useAppSelector(selectStatus);
    const dispatch = useDispatch();

    const isLoading = status === LoadingStatus.Loading;

    const onFinish = (values: FormInputsType) => {
        dispatch(createSecret(values));
    }

    return (
        <PageContainer>
            <Row align="top" justify="center" style={{ marginBottom: "2em" }}><Title children="Create secret" /></Row>
            {isLoading && <Row justify="center"><Spin /></Row>}
            <Row align="middle" justify="center">
                <Col span={8}>
                    <Form form={form} name="secret-retrieve" layout="vertical" onFinish={onFinish}>
                        <Form.Item name="secretText" label="Secret" rules={[{ required: true }]} >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="expiresAt" label="Expires after (minutes)" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item name="remainingViews" label="Expire after views" rules={[{ required: true }]} >
                            <InputNumber min={1} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={isLoading}> Save Secret </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                </Col>
            </Row>
        </PageContainer >
    )
}