import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {useSelector,useDispatch} from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {Row , Col, Button,Input} from 'antd'
import { followorfollowing, followorunfollowing,getallusers } from '../redux/actions/UserAction'
import {
  CheckOutlined,
  UserAddOutlined,
  UserDeleteOutlined
 } from '@ant-design/icons';
const AllUsers = () => {
  const {users}=useSelector(state=>state.userReducer)
  const currentUser = JSON.parse(localStorage.getItem('User')).user
  const dispatch=useDispatch();
  const {followloading,unfollowloading}=useSelector(state=>state.alertReducer)
  const [searchkey ,setSearchkey]=useState("");

  
  useEffect(()=>{
    dispatch(getallusers());
  },[dispatch,followloading,unfollowloading])

  return (
    <DefaultLayout>
      <div className='mt-3'>
        <Row justify='center' gutter={20}>
          <Col lg={20} md={21} sm={20} xs={20} >
           <Input placeholder="Search user.." value={searchkey} onChange={(e)=>setSearchkey(e.target.value)}  />
          </Col>
          {users && users.filter((obj)=>obj?.username?.toLowerCase().includes(searchkey.toLowerCase())).map(user=>{           
             if (!user || !user._id) return null; 
             return <>{
              
              currentUser._id !== user._id && (
              <Col lg={6} md={8} sm={12} xs={20}>
              <div className='all-user bs-1 mt-3 p-3'>
                {user.profilePicUrl==="" ?
                  (<span className='profilepic d-flex justify-content-center align-items-center'>{user.username[0].toUpperCase()}</span>) 
                  : (<img src={user.profilePicUrl} alt='profile' className='profilepic d-flex justify-content-center align-items-center' />)
                }
                
                <Link to={`/profile/${user._id}`} className='username'>{user.username}</Link> 
                <p>{moment(user.createdAt).format('MMMM Do YYYY')}</p>
                {user.followers.find((obj) => obj === currentUser._id) ? (
                        <div className='d-flex justify-content-evenly'>
                           <Button className='buttn2' icon={<CheckOutlined />}>Following</Button>
                           <Button className='buttn' icon={<UserDeleteOutlined />} onClick={() => {
                            dispatch(
                              followorunfollowing(currentUser._id, user._id)
                            );
                          }}>Unfollow</Button>
                        </div>
                      ) : (
                        <Button
                        icon={<UserAddOutlined />}
                          onClick={() => {
                            dispatch(
                              followorfollowing(currentUser._id, user._id)
                            );
                          }}
                        >
                          Follow
                        </Button>
                      )}
                </div>
             </Col>)}
             </>
          })}
          
         
        </Row>
      </div>
    </DefaultLayout>
  )
}

export default AllUsers
