import { Input, Form, Button, Row, Col, Divider } from 'antd';
import Title from 'antd/lib/typography/Title';
import { PageContainer } from './PageContainer';
import { SecretDetails } from './SecretDetails';

export function SaveForm() {

    const [form] = Form.useForm();

    return (
        <PageContainer>
            <Row align="top" justify="center" style={{ marginBottom: "2em" }}><Title children="Save secret" /></Row>
            <Row align="middle" justify="center">
                <Col span={8}>
                    <Form form={form} name="secret-retrieve" layout="vertical">
                        <Form.Item name="hash" label="Hash" rules={[{ required: true }]} >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="secret-text" label="Secret text" rules={[{ required: true }]} >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="expire" label="Expire" rules={[{ required: true }]} >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="maximum-view" label="Maximum views" rules={[{ required: true }]} >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"> Get Secret </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                </Col>
            </Row>
        </PageContainer >
    )
}