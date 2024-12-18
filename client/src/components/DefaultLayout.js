import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined ,
  UsergroupAddOutlined,
  BookOutlined,
  LogoutOutlined,
  FileAddOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './DefaultLayout.css'
import {Link,useLocation} from 'react-router-dom'
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const location=useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const pathToKey = {
    '/': '1',
    '/addpost': '2',
    '/profile/${userid}':'3',
    '/allusers': '4',
    '/saved': '5',
    '/logout': '6',
  };
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('User')
    navigate('/login')
  }

  const user=JSON.parse(localStorage.getItem('User')).user
  return (
    <Layout>
     
      <Layout className='site-layout'>
        <Header className='site-layout-background bs-1 sticky-header'
          style={{
            padding: 0,
            position:'sticky',
            top:0,
            left:0,
            overflow:'auto',
            zindex:999,
            width:'100%',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ marginLeft: '16px' , paddingTop:'10px' }}>
            <h2  style={{marginTop:'7px'}}>Writer's Haven</h2>
          </div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 44,
              height: 44,
              marginRight: '6px',
            }}
          />
          
          
         
        </Header>
        <Content className='site-layout-background'
          style={{
            
            marginTop:5,
            padding:5,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
         {props.children}
        </Content>
      </Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu className='sider'
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathToKey[location.pathname]]}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: <Link to='/'>Home</Link>,
            },
            {
              key: '2',
              icon: <FileAddOutlined />,
              label: <Link to="/addpost">Add Post</Link>,
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: <Link to={`/profile/${user._id}`}>Profile</Link>,
            },
            {
              key: '4',
              icon: <UsergroupAddOutlined />,
              label: <Link to="/allusers">All User</Link>,
            },
            
            {
              key: '5',
              icon: <BookOutlined />,
              label: <Link to="/saved">Saved</Link>,
            },
            
            {
              key: '6',
              icon: <LogoutOutlined />,
              label: <Link to="/logout">Logout</Link>,
              onClick:handleLogout
            },
          ]}
        />
      </Sider>
    </Layout>
  );
};
export default DefaultLayout;