import { Input, Form, Button, Row, Col, Divider, DatePicker } from 'antd';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { createSecret, selectStatus } from '../features/secret/secretSlice';
import { PageContainer } from './PageContainer';

type FormInputsType = {
    secretText: string,
    expiresAt: string,
    remainingViews: number
}

export function SaveForm() {

    const [form] = Form.useForm();
    const status = useAppSelector(selectStatus);
    const dispatch = useDispatch();

    const onFinish = (values: FormInputsType) => {
        const secret = {
            ...values,
            expiresAt: moment.utc(values.expiresAt).toISOString()
        }
        dispatch(createSecret(secret));
    }

    return (
        <PageContainer>
            <Row align="top" justify="center" style={{ marginBottom: "2em" }}><Title children="Save secret" /></Row>
            <Row align="middle" justify="center">
                <Col span={8}>
                    <Form form={form} name="secret-retrieve" layout="vertical" onFinish={onFinish}>
                        <Form.Item name="secretText" label="Secret text" rules={[{ required: true }]} >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="expiresAt" label="Expires at">
                            <DatePicker showTime />
                        </Form.Item>
                        <Form.Item name="remainingViews" label="Maximum views" rules={[{ required: true }]} >
                            <Input style={{ width: "100%" }} type="number" min={0} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"> Save Secret </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                </Col>
            </Row>
        </PageContainer >
    )
}