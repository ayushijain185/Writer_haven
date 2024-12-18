import React from 'react'
import {Link} from 'react-router-dom'
import {Row , Col , Form , Input, Button} from 'antd'
import {useDispatch} from 'react-redux'
import { userRegister } from '../redux/actions/UserAction'
const Register = () => {
  const dispatch=useDispatch();
    function register(values){
        dispatch(userRegister(values))

    }
  return (
    <div className='main-div'>
      
      <Row justify='center' className='register-div'>
      

        <Col lg={8} xs={20}>
        <Form layout='vertical' className='bs1' style={{padding:'20px' , margin : '0 auto', background:'white'}} onFinish={register}>
            <h1 className='text-center'>Register Page</h1>
            <hr />
            <Form.Item name="username" rules={[{required:true}]}>
                <Input placeholder='Enter Your Name'/>
            </Form.Item>
            <Form.Item  name="email" rules={[{required:true}]}>
                <Input placeholder='Enter Your Email'/>
            </Form.Item>
            <Form.Item name="question" rules={[{required:true}]}>
                <Input placeholder='Security Pincode'/>
            </Form.Item>
            <Form.Item name="password" rules={[{required:true}]}>
                <Input type='password' placeholder='Enter Your Password'/>
            </Form.Item>
            <div className='button-div'>
            <Link to='/login' className='p-2'>Already Registered? click here to login</Link>
            <Button type='button' htmlType='submit' className='btn btn-primary'>Register</Button>
            </div>
        </Form>
        </Col>

       

      </Row>
    </div>
  )
}

export default Register
