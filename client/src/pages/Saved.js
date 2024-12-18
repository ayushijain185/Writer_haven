import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout'
import { getSavedPosts } from '../redux/actions/UserAction';
import Post from '../components/Post';
import {Row , Col} from 'antd'

const Saved = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('User'))?.user;
    const userId = user?._id;

    const { savedPosts } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (userId) {
            dispatch(getSavedPosts(userId));
        }
    }, [dispatch, userId]);

    return (
      <DefaultLayout>
         <Row justify='center'>
          <Col lg={11} md={9} sm={18} xs={23}>
            <div className="saved-posts">
                <h2 className='m-2 p-2 text-center'>Saved Posts</h2>
                {savedPosts.length > 0 ? (
                    savedPosts.map((p) => (
                        <Post key={p._id} post={p} postinprofile={false}/>
                    ))
                ) : (
                    <p>No saved posts yet.</p>
                )}
            </div>
          </Col>
        </Row>
        </DefaultLayout>
    );
};

export default Saved;
