import axios from 'axios';
import { message } from 'antd';

export const userRegister = (values) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        await axios.post('/api/v1/user/register', values);
        message.success('Registered Successfully');
        window.location.href = '/login';
    } catch (err) {
        message.error(err.response?.data?.message || 'Registration failed');
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const userLogin = (values) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        const response = await axios.post('/api/v1/user/login', values);
        message.success('User Logged in');
        localStorage.setItem('User', JSON.stringify(response.data));
        window.location.href = '/';
    } catch (err) {
        message.error(err.response?.data?.message || 'Login failed');
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const userForgotPassword = (values) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        await axios.post('/api/v1/user/forgot-password', values);
        message.success('Password changed successfully');
        window.location.href = '/login';
    } catch (err) {
        message.error(err.response?.data?.message || 'Password reset failed');
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const getallusers=(values)=>async (dispatch)=>{
    dispatch({ type: 'LOADING', payload: true });
    try {
        const res = await axios.get('/api/v1/user/getallusers');
        dispatch({type:'GET_ALL_USERS' , payload:res.data})
        
    } catch (err) {
        message.error(err.response?.data?.message || 'something went wronge');
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
    
}
export const followorfollowing =(currentuserid, receiveruserid)=>async (dispatch)=>{
    dispatch({ type: 'FOLLOW_LOADING', payload: true });
    try {
        await axios.post('/api/v1/user/followuser',{currentuserid,receiveruserid});
        
    } catch (err) {
        message.error(err.response?.data?.message || 'something went wronge');
    } finally {
        dispatch({ type: 'FOLLOW_LOADING', payload: false });
    }
    
}

export const followorunfollowing =(currentuserid, receiveruserid)=>async (dispatch)=>{
    dispatch({ type: 'UNFOLLOW_LOADING', payload: true });
    try {
        await axios.post('/api/v1/user/unfollowuser',{currentuserid,receiveruserid});
        
        
    } catch (err) {
        message.error(err.response?.data?.message || 'something went wronge');
    } finally {
        dispatch({ type: 'UNFOLLOW_LOADING', payload: false });
    }
    
}

export const editUser = (values) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        const res = await axios.post('/api/v1/user/edit', values);
        message.success('Edit Successfully');
        localStorage.setItem('User' , JSON.stringify(res.data))
        window.location.href= `profile/${res.data.user._id}`
    } catch (err) {
        message.error(err.response?.data?.message || 'Edit failed');
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const savePost = (userId, postId) => async (dispatch) => {
    try {
        await axios.post('/api/v1/user/savepost', { userId, postId });
        message.success('Post saved/unsaved successfully');
        dispatch(getSavedPosts(userId));
    } catch (error) {
        message.error(error.response?.data?.message || 'Failed to save/unsave post');
    }
};

export const getSavedPosts = (userId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/user/getsavedpost/${userId}`);
        dispatch({ type: 'GET_SAVED_POSTS', payload: data });
    } catch (error) {
        message.error(error.response?.data?.message || 'Failed to get saved posts');
    }
};