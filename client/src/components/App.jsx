import React, {useEffect} from 'react';
import Navbar from "./navbar/Navbar";
import './app.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import Disk from "./disk/Disk";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";
import {Navigate} from 'react-router-dom'

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

  return (
      <BrowserRouter>
          <div className='app'>
              <Navbar/>
                  {!isAuth ?
                      <Routes>
                          <Route path='/registration' element={<Registration/>}/>
                          <Route path='/login' element={<Login/>}/>
                          <Route path='*' element={<Navigate to="/login" replace={true}/>}/>
                      </Routes>
                      :
                      <Routes>
                          <Route exact path='/' element={<Disk/>}/>
                          <Route path='*' element={<Navigate to="/" replace={true}/>}/>
                      </Routes>
                  }
          </div>
      </BrowserRouter>
  );
}

export default App;
