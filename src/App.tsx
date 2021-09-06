import 'antd/dist/antd.css';
import { Menu, notification } from 'antd';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { SecretForm } from './components/SecretForm';
import { SaveForm } from './components/SaveForm';
import './App.css';
import { useAppSelector } from './app/hooks';
import { selectErrorMessage } from './features/errorMessage/errorMessageSlice';
import { useEffect } from 'react';
import { selectSuccessMessage } from './features/successMessage/successMessageSlice';

function App() {

  const errorMessage = useAppSelector(selectErrorMessage);
  const successMessage = useAppSelector(selectSuccessMessage);
  const { pathname } = useLocation();

  useEffect(() => {
    if (errorMessage !== undefined) {
      notification.error({
        message: "Error",
        description: errorMessage
      });
    }
  }, [errorMessage])

  useEffect(() => {
    if (successMessage !== undefined) {
      notification.success({
        message: "Success",
        description: successMessage
      })
    }
  }, [successMessage])

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={pathname === '/retrieve' ? ['Retrieve'] : ['Create']}>
          <Menu.Item key='Create'><Link to={"/"}>Create secret</Link></Menu.Item>
          <Menu.Item key='Retrieve'><Link to={"/retrieve"}>Retrieve secret</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '20px 50px' }} >
        <Switch>
          <Route path="/" exact component={SaveForm} />
          <Route path="/retrieve" exact component={SecretForm} />
        </Switch>
      </Content>
      <Footer>Created by Viktor Fórizs, 2021 august</Footer>
    </Layout>
  );
}

export default App;
