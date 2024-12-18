import './App.css';
import { useEffect } from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddPost from './pages/AddPost';
import AllUsers from './pages/AllUsers';
import Saved from './pages/Saved';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import { useSelector,useDispatch } from 'react-redux';
import {ProtectedRoute} from './ProtectedRoute';
import {getallusers} from './redux/actions/UserAction'
import { getposts } from './redux/actions/PostAction';
import EditProfile from './pages/EditProfile';
function App() {
  const {loading,likeorunlikeloading}=useSelector((state)=>state.alertReducer);
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getposts())
    dispatch(getallusers())

  },[dispatch])
  return (
    <div className="App">
       {(loading || likeorunlikeloading) && (<div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>)}
      <BrowserRouter>
      <Routes>
       <Route path='/register' element={<Register />} />
       <Route path='/login' element={<Login />} />
       <Route path='/forgot-password' element={<ForgotPassword />} />
       <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile/:userid' element={<Profile />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path='/addpost' element={<AddPost />} />
            <Route path='/allusers' element={<AllUsers />} />
            <Route path='/saved' element={<Saved />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;


