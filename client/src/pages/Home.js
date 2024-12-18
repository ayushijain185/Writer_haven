import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector} from 'react-redux'
import {Row , Col} from 'antd'
import Post from '../components/Post'
const Home = () => {
  // const {users}=useSelector(state=>state.userReducer)
  const {posts}=useSelector(state=>state.postReducer)
  const postList = Array.isArray(posts) ? posts : [];

  return (
    <DefaultLayout>
    <Row justify='center'>
        <Col lg={18} md={9} sm={18} xs={23}>
        <h1 className='text-center'>Posts</h1>
        {postList.length > 0 ? (
            postList.map((post) => <Post post={post} key={post._id} postinprofile={false}/>)
          ) : (
            <p>No posts available</p>
          )}

        </Col>
    </Row>
    </DefaultLayout>
  )
}

export default Home
