import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {Row , Col , Form, Button } from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Addpost} from '../redux/actions/PostAction'
import { useDispatch } from 'react-redux';
const AddPost = () => {
  const dispatch=useDispatch();
  function addpost(values){
    console.log("add : ",values);
    dispatch(Addpost(values));

  }
  return (
    <DefaultLayout>
      <div className='post-box mt-20 p-20'>
      <Row justify='center' >
        <Col lg={35} xs={24}>
          <Form layout='vertical' className='form bs-1' style={{padding:'20px'}} onFinish={addpost}>
          <h3>Express yourself...</h3>
          <Form.Item name="title" rules={[{required:true}]}>
              <input type='text' placeholder='Title' className='input w-100 bs-1 p-2'/>
            </Form.Item>
            <Form.Item name="description" rules={[{required:true}]}>
              <ReactQuill theme="snow" className='bs-1 input' style={{height : '250px', paddingBottom:'40px',margin:'10px'}} />
            </Form.Item>
            <div className="buttn"><Button type='primary' htmlType='submit'> Add Post </Button></div>
          </Form>
        </Col>
      </Row>
      </div>
    </DefaultLayout>
  )
}

export default AddPost
