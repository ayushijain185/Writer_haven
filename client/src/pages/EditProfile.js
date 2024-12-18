import React, { useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row,Col, Button , Form , Input, Select } from 'antd';

import { useDispatch } from 'react-redux';
import { editUser } from '../redux/actions/UserAction';
const EditProfile = () => {
    const dispatch=useDispatch();
    const user = JSON.parse(localStorage.getItem('User')).user
    const [profilePicUrl , setProfilepicurl]=useState(user.profilePicUrl);
    function handleFileInput(e){
        const file=e.target.files[0]
        const reader=new FileReader(file)
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setProfilepicurl(reader.result)
        }
    }
    const onFinish = (values) => {
        values.profilePicUrl=profilePicUrl
        values._id=user._id
        dispatch(editUser(values))
      };
  return (
    <DefaultLayout>
        <h3 className='text-center mt-3'>Edit Profile</h3>
        <Row justify='center'>
            <Col lg={12} sm={23}>
            <div className='bs-1 p-3'>
                <Form layout='vertical' initialValues={user} onFinish={onFinish} >
                    <Form.Item name='username' label='Name'>
                        <Input />
                    </Form.Item>
                    <Form.Item name='bio' label='Bio'>
                        <Input />
                    </Form.Item>
                    <Form.Item name='password' label='Password'>
                        <Input />
                    </Form.Item>
                    <Form.Item name='privateAccount' label='Account privacy'>
                        <Select className='select'>
                            <Select.Option value={true}>Private</Select.Option>
                            <Select.Option value={false}>Public</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='profilePicUrl' label='Profile pic'>
                        <div className="d-flex align-items-center">
                            {profilePicUrl==="" ?
                                (<span className='profilepic d-flex justify-content-center align-items-center m-2'>{user.username[0].toUpperCase()}</span>) 
                                : (<img src={profilePicUrl} alt='profile' className='profilepic d-flex justify-content-center align-items-center m-2'/>)
                            }
                            <Input type='file' onChange={handleFileInput}/>
                        </div>
                        
                        
                    </Form.Item>
                   
                    <Button htmlType='submit' className='buttn border-3 border-black'>Update</Button>
                    

                </Form>
                </div>
            </Col>
        </Row>
        
      
    </DefaultLayout>
  )
}

export default EditProfile
