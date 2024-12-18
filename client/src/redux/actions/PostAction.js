import axios from 'axios';
import { message } from 'antd';

export const Addpost = (values) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('User'));
    values.user = user.user._id;
    values.likes=[]
    values.comments=[]
    console.log(values)
    if (!values.user) {
        message.error('User ID is missing');
        return;
    }
    dispatch({ type: 'LOADING', payload: true });
    try {
        await axios.post('/api/v1/post/addpost', values);
        message.success('Post Uploaded Successfully');
        window.location.href = '/';
    } catch (err) {
        message.error(err.response?.data?.message || 'Upload failed');
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};
export const getposts = () => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        const res = await axios.get('/api/v1/post/getallposts');
        dispatch({type:'GET_ALL_POST' , payload:res.data})
        
    } catch (err) {
        message.error(err.response?.data?.message || 'something went wronge');
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const likeorunlikepost = (postid) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('User'));
    const values={
        userid : user.user._id,
        postid : postid,
    }
    
    dispatch({ type: 'LIKE_UNLIKE_LOADING', payload: true });
    try {
        await axios.post('/api/v1/post/likeorunlike', values);
    } catch (err) {
        message.error(err.response?.data?.message || 'Upload failed');
    } finally {
        dispatch({ type: 'LIKE_UNLIKE_LOADING', payload: false });
    }
};

export const addcomment = (comment,postid) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('User'));
    const values={
        userid : user.user._id,
        postid : postid,
        comment:comment
    }
    
    dispatch({ type: 'ADD_COMMENT_LOADING', payload: true });
    try {
        await axios.post('/api/v1/post/addcomment', values);
    } catch (err) {
        message.error(err.response?.data?.message || 'Comment not add added');
    } finally {
        dispatch({ type: 'ADD_COMMENT_LOADING', payload: false });
    }
};

export const EditPost = (values) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('User')).user;
    dispatch({ type: 'EDIT_POST_LOADING', payload: true });
    try {
        await axios.post('/api/v1/post/editpost', values);
        message.success('Post Updated Successfully');
        window.location.href = `/profile/${user._id}`;
    } catch (err) {
        message.error(err.response?.data?.message || 'update failed');
    } finally {
        dispatch({ type: 'EDIT_POST_LOADING', payload: false });
    }
};

export const deletePost = (values) => async (dispatch) => {
    dispatch({ type: 'DELETE_POST_LOADING', payload: true });
    try {
        await axios.post('/api/v1/post/deletepost',values);
        message.success('Post Deleted Successfully');
    } catch (err) {
        message.error(err.response?.data?.message || 'Failed to delete');
    } finally {
        dispatch({ type: 'DELETE_POST_LOADING', payload: false });
    }
};