import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import {useDispatch, useSelector} from 'react-redux';
import { savePost ,getSavedPosts } from '../redux/actions/UserAction';
import { likeorunlikepost ,getposts, addcomment ,EditPost, deletePost} from '../redux/actions/PostAction';
import { Modal,Row , Col,Input, Button } from 'antd';
import {
    HeartFilled,
    HeartOutlined,
    SaveFilled,
    SaveOutlined,
    CommentOutlined,
    DeleteOutlined,
    EditFilled
   } from '@ant-design/icons';

const Post = ({post,postinprofile}) => {
    const formattedDate = moment(post.createdAt).format('MMMM Do YYYY');
    const dispatch=useDispatch();

    const [editPost, seteditPost]=useState(false);
    const [description, setDescription]=useState(post.description);
    const [title, setTitle]=useState(post.title);

    const [commentvisibility , setCommentvisibility]=useState(false);
    const [comment, setComment]=useState("");
    const TextArea=Input;
    const { users, savedPosts } = useSelector((state) => state.userReducer);
    function handleAddComment(){
        dispatch(addcomment(comment , post._id)) 
        setComment("")
    }

    const user = JSON.parse(localStorage.getItem('User'))?.user;
    const userId = user?._id;
    const userHasLiked = post.likes.some(like => like.user === userId);
    const userHasSaved = savedPosts.some(savedPost => savedPost._id === post._id);
    const {likeorunlikeloading ,addcommentloading,editpostloading}=useSelector(state=>state.alertReducer);

    useEffect(() => {
        dispatch(getposts());
        if (userId) {
            dispatch(getSavedPosts(userId));
        }
    }, [likeorunlikeloading, addcommentloading, editpostloading, dispatch, userId]);

    const handleSavePost = () => {
        dispatch(savePost(userId, post._id));
    };

  return (
    <>
       
            <div className='bs-1 p-3 m-4'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className="d-flex align-items-center">
                        {post.user.profilePicUrl==="" ?
                            (<span className='profilepic d-flex justify-content-center align-items-center'>{post?.user?.username[0].toUpperCase() || 'U'}</span>) 
                            : (<img src={post.user.profilePicUrl} alt='profile' className='profilepic d-flex justify-content-center align-items-center'/>)
                        }
                        <Link to={`/profile/${post.user._id}`} className='username'>{post.user.username}</Link> 
                    </div>

                    <div className='d-flex p-2'>
                        <p>{formattedDate}</p>
                    </div>

                </div>
                <hr />
                <div className='d-flex flex-column p-2'>
                    <div dangerouslySetInnerHTML={{ __html: post.description }} />
                    
                </div>

                <div className='d-flex p-2 m-2 justify-content-between'>
                    <div className="d-flex">
                    {userHasLiked ? <HeartFilled className='p-2 fs-6' onClick={()=>dispatch(likeorunlikepost(post._id))} style={{color: 'red'}} /> : <HeartOutlined className='p-2 fs-6' onClick={()=>dispatch(likeorunlikepost(post._id))} />}
                        <span>{post.likes.length}</span>
                        <CommentOutlined className='p-2 fs-6' onClick={()=>setCommentvisibility(true)} />
                        <span>{post.comments.length}</span>
                        {userHasSaved ? <SaveFilled className='p-2 fs-6' onClick={handleSavePost} /> : <SaveOutlined className='p-2 fs-6' onClick={handleSavePost} />}
                    </div>
                    {(post.user._id===userId && postinprofile ) && (<div className="d-flex ">
                        <EditFilled  className='p-2 fs-6' onClick={()=>seteditPost(true)}/> 
                        <DeleteOutlined  className='p-2 fs-6' onClick={()=>dispatch(deletePost({_id : post._id}))} />

                        
                    </div>)}
                </div>

                <Modal 
                open={commentvisibility} 
                title="Comments" 
                closable={false}  
                footer={[
                    <Button key="submit" type="primary" onClick={() => {
                      setCommentvisibility(false);
                    }}>
                     Cancel
                    </Button>
                ]}
                >
                    <Row>
                        <Col lg={24} xs={24}>
                        <div className='d-flex flex-1'>
                            <TextArea value={comment} onChange={(e)=>setComment(e.target.value)} className="input m-1" placeholder='Add comment...' />
                            <Button 
                            type='primary' 
                            htmlType='submit' 
                            className='px-2 m-1' 
                            onClick={handleAddComment}> Add </Button>
                        </div>
                        
                        {post.comments.map((comment , index)=>{
                             const user2 = users.find((obj) => obj._id === comment.user);

                            return(
                                <div key={index} className='d-flex flex-column my-1 mx-1'>
                                    <div className="d-flex my-1">
                                    {user2.profilePicUrl===""? (<span className='profilepic d-flex justify-content-center align-items-center'>{user2.username[0].toUpperCase()}</span>):(<img src={user2.profilePicUrl} alt='profile' />)}
                                <Link to={`/profile/${user2._id}`} className='px-2 fs-5' >{user2.username}</Link></div>
                                <div className="d-flex justify-content-between px-3">
                                    <p className='comment-text'>{comment.comment}</p>
                                    <p className='comment-date'>{comment.date}</p>
                                </div>
                                </div>
                            )


                        })}
                        
                        </Col>
                    </Row>
                </Modal>

                <Modal open={editPost} 
                title="Edit Post" 
                closable={false}  
                footer={[
                    <>
                    <Button key="submit" type="primary" onClick={() => {
                      seteditPost(false);
                    }}>
                     Cancel
                    </Button>
                    <Button key="submit" type="primary" onClick={()=>{
                        dispatch(EditPost({_id:post._id , title:title , description:description}))
                        seteditPost(false)
                    }} >
                       Update
                      </Button>
                    </>
                ]}>
                    <Row>
                        <Col lg={24} xs={24} >
                            <div className='d-flex flex-column flex-1'>
                                <TextArea value={title} onChange={(e)=>setTitle(e.target.value)} className="input m-1"/>
                                <ReactQuill value={description} onChange={setDescription} className="input m-1" />
                            </div>
                        </Col>
                    </Row>

                </Modal>
            </div>
        
      
    </>
  )
}

export default Post
