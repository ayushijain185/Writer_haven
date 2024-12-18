import React from 'react'
import {Link} from 'react-router-dom'
import {UserOutlined} from '@ant-design/icons';
import {Row , Col , Form , Input, Button} from 'antd'
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/UserAction';
const Login = () => {
  const dispatch=useDispatch();
  function login(values){
    console.log(values)
    dispatch(userLogin(values));

  }
  return (
    <div className='main-div'>
      <Row justify='center' className='login-div'>
        <Col lg={8} xs={20}>
        <Form layout='vertical' className='bs1' style={{padding:'30px' , margin : '0 auto'}} onFinish={login}>
        <div className='text-center'> <UserOutlined style={{ fontSize: '48px', height: '48px', width: '48px'}}/></div>
        <h1 className='text-center'>Login Page</h1>
        <hr />
            <Form.Item name="username" rules={[{required:true}]}>
                <Input placeholder='Enter Your Name'/>
            </Form.Item>
            <Form.Item name="password" rules={[{required:true}]}>
                <Input type='password' placeholder='Enter Your Password'/>
            </Form.Item>
          
           
            <div className='button-div'>
            <Link to='/register' className='p-2'>Do not have account? click here to Register</Link>
            <Button type='button' htmlType='submit' className='btn btn-primary'> Login </Button>           
            </div>
            <div className='text-left px-2'><Link to='/forgot-password' >Forgot password?</Link></div>
        </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login
