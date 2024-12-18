import React,{ useState} from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Row,Col, Button,Modal } from 'antd';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import { useDispatch } from 'react-redux';
import { followorfollowing, followorunfollowing } from '../redux/actions/UserAction'
import { UserDeleteOutlined ,UserAddOutlined } from '@ant-design/icons';
const Profile = () => {
  const dispatch=useDispatch();
  const { users = [] } = useSelector(state => state.userReducer) || {};
  const { posts = [] } = useSelector(state => state.postReducer) || {};
  const currentuser = JSON.parse(localStorage.getItem('User')).user;
  const { userid } = useParams();
  const user = users.find(obj => obj._id === userid);
  const userposts=posts.filter(obj => obj.user._id === userid);
  const [followersModalDisplay, setfollowersModalDisplay] = useState(false);
  const [followingModalDisplay, setfollowingModalDisplay] = useState(false);
  return (
    <DefaultLayout>
      {users.length>0 && (  <>
        <Row justify='center'>
          <Col lg={15} md={18} sm={23} xs={23}>
            <div className='bs-1 mt-3 d-flex flex-column'>

              <div className="profile-div">
                  <div className="d-flex py-1">
                    {user.profilePicUrl==="" ?
                        (<span className='profile-pic d-flex justify-content-center align-items-center'>{user.username[0].toUpperCase()}</span>) 
                        : (<img src={user.profilePicUrl} alt='profile' className='profile-pic d-flex justify-content-center align-items-center'/>)
                    }
                    
                  </div>
                  <div className="d-flex flex-column px-3 my-0">
                    <p className='profile-username'>{user.username}</p> 
                    <p className='profile-date'>Join : {moment(user.createdAt).format('MMMM Do YYYY')}</p>
                    {currentuser._id ===user._id && (<Button className='profile-button'><Link to='/editprofile' style={{ textDecoration: 'none', color: 'inherit' }}>Edit Button</Link></Button>)}
                  </div>
              </div>

              <div className="profile-div2">
                  <h3 className='mx-2'> {user.bio==="" ? "Nothing in Bio " : user.bio}</h3>
                  <div className="d-flex profile-following-div">
                    <Button className='p-2 mx-2 my-1 profile-button' onClick={()=>setfollowersModalDisplay(true)}>Followers : {user.followers.length}</Button>
                    <Button className='p-2 mx-2 my-1 profile-button' onClick={()=>setfollowingModalDisplay(true)}>Following : {user.following.length}</Button>
                  </div>
                  
                  <p className='fs-5 mx-2 my-1'>Total Posts : {userposts.length}</p>
                </div>
              

            </div>

          </Col>
        </Row>

        {user.followers.find((obj) => obj === currentuser._id) ||
          user.privateAccount === false ||
          user._id === currentuser._id ? (
            <Row gutter={20} justify="center">
              {userposts.map((post) => {
                return (
                  <Col lg={10} md={13} sm={20} xs={24}>
                    <Post post={post} postinprofile={true} />
                  </Col>
                );
              })}
            </Row>
          ) : (
            <p className='fs-4 text-body-secondary text-center m-4'>This account is private</p>
          )}

          
              <Modal open={followersModalDisplay} 
                title="Followers" 
                closable={false}  
                footer={[
                    <Button key="submit" type="primary" onClick={() => {
                      setfollowersModalDisplay(false);
                    }}>
                     Cancel
                    </Button>
                ]}>
                  <Row>
                  <Col lg={24} xs={24} >
                  {user.followers.length < 1 ? (<p>No followers</p>) : " "}
                  {user.followers.map(obj=>{
                    const followeruser=users.find(o=>o._id===obj) 
                      return (
                    
                      <div className='bs-1 mt-3 p-3 d-flex justify-content-between'>
                        <div className="d-flex ">
                          {followeruser.profilePicUrl==="" ?
                            (<span className='profilepic d-flex justify-content-center align-items-center'>{followeruser.username[0].toUpperCase()}</span>) 
                            : (<img src={followeruser.profilePicUrl} alt='profile' className='profilepic d-flex justify-content-center align-items-center' />)
                          }
                          <Link to={`/profile/${followeruser._id}`} className='username'>{followeruser.username}</Link> 
                        </div>
                        <div>
                        <Button
                        icon={<UserAddOutlined />}
                          onClick={() => {
                            dispatch(
                              followorfollowing(currentuser._id, followeruser._id)

                            );
                          }}
                          
                        >
                          Follow
                        </Button>
                        
                        </div>
                      </div>
                     )
                  })}
                  
                  </Col>
                  </Row>

                </Modal>

                <Modal open={followingModalDisplay} 
                title="Following" 
                closable={false}  
                footer={[
                    <Button key="submit" type="primary" onClick={() => {
                      setfollowingModalDisplay(false);
                    }}>
                     Cancel
                    </Button>
                ]}>
                  {user.following.length < 1 ? (<p>No following</p>) : " "}
                  {user.following.map(obj=>{
                    const followinguser=users.find(o=>o._id===obj) 
                      return (
                      <div className='bs-1 mt-3 p-3 d-flex justify-content-between'>
                        <div className="d-flex ">
                          {followinguser.profilePicUrl==="" ?
                            (<span className='profilepic d-flex justify-content-center align-items-center'>{followinguser.username[0].toUpperCase()}</span>) 
                            : (<img src={followinguser.profilePicUrl} alt='profile' className='profilepic d-flex justify-content-center align-items-center' />)
                          }
                          <Link to={`/profile/${followinguser._id}`} className='username px-1'>{followinguser.username}</Link> 
                        </div>
                        <div>
                        <Button icon={<UserDeleteOutlined />} onClick={() => {
                            dispatch(
                              followorunfollowing(currentuser._id, followinguser._id)
                            );
                          }}>Unfollow</Button>
                       
                        </div>
                      </div>)
                  })}

                </Modal>
        
    </>
      )}
      
    </DefaultLayout>
  )
}

export default Profile
