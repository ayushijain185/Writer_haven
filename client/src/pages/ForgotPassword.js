import React from 'react'
import {Link} from 'react-router-dom'
import {Row , Col , Form , Input, Button} from 'antd'
import { useDispatch } from 'react-redux';
import { userForgotPassword } from '../redux/actions/UserAction';

const ForgotPassword = () => {
    const dispatch=useDispatch();
    function forgot(values){
        console.log(values);
      dispatch(userForgotPassword(values));
    }
  return (
    <div className='main-div'>
      <Row justify='center' className='login-div'>
        <Col lg={8} xs={20}>
        <Form layout='vertical' className='bs1' style={{padding:'30px' , margin : '0 auto'}} onFinish={forgot}>
        <h1 className='text-center'>Change Password</h1>
        <hr />
            <Form.Item name="email" rules={[{required:true}]}>
                <Input placeholder='Enter Your Email'/>
            </Form.Item>
            <Form.Item name="question" rules={[{required:true}]}>
                <Input placeholder='Security Answer'/>
            </Form.Item>
            <Form.Item name="newPassword" rules={[{required:true}]}>
                <Input placeholder='Enter Your Password'/>
            </Form.Item>
           
            <div className='button-div'>
            
            <Button type='button' htmlType='submit' className='btn btn-primary'>Submit</Button>
            <Link to='/register' className='p-1'>Do not have account? click here to Register</Link>
           
           
            </div>
        </Form>
        </Col>
      </Row>
    </div>
  )

}

export default ForgotPassword
