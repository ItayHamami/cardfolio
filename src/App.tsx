import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddPost from './components/AddPost';
import About from './components/About';
import Footer from './components/Footer';
import FavoritePage from './components/FavoritePage';
import BusinessDetails from './components/BusinessDetails';
import MyCards from './components/MyCards';
import Post from './interfaces/Post';
import { getPosts } from './services/postsService';
import EditPost from './components/EditPost';
import { DarkModeToggle } from './components/DarkModeToggle';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { DarkModeProvider, useDarkMode } from './components/DarkModeContext';





function App() {
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { userEmail: false, isAdmin: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );


  return (
    <div className="App">
<ToastContainer/>
<Router>
  <DarkModeProvider>
  <Navbar userInfo={userInfo} setUserInfo={setUserInfo}/>

  <Routes>
    <Route path='/' element={<Home userInfo={userInfo} />}/>
    <Route path='/login' element={<Login setUserInfo={setUserInfo}/>}/>
    <Route path='/register' element={<Register setUserInfo={setUserInfo}/>}/>
    <Route path='/newpost' element={<AddPost userInfo={userInfo}/>}/>
    <Route path='/editpost/:postId' element={<EditPost userInfo={userInfo}/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/favorites' element={<FavoritePage userInfo={userInfo}/>}/>
    <Route path='/biz-details/:currentId' element={<BusinessDetails/>}/>
    <Route path='/mycards' element={<MyCards userInfo={userInfo}/>}/>



  </Routes>
  <Footer userInfo={userInfo}/>
  </DarkModeProvider>
</Router>
    </div>
  );
}

export default App;
