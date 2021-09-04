import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { SecretForm } from './components/SecretForm';
import { SaveForm } from './components/SaveForm';
import './App.css';

function App() {

  const { pathname } = useLocation();

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={pathname === '/retrieve' ? ['Retrieve'] : ['Save']}>
          <Menu.Item key='Save'><Link to={"/"}>Save</Link></Menu.Item>
          <Menu.Item key='Retrieve'><Link to={"/retrieve"}>Retrieve</Link></Menu.Item>
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
