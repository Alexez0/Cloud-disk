import React, {useState} from 'react';
import './navbar.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";


const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)


    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar-header">Cloud Disk</div>
                {isAuth && <input value={searchName} onChange={(e)=>searchChangeHandler(e)} type="text" placeholder="Search files..." className='navbar__search'/>}
                {!isAuth && <div className="navbar-login"><NavLink to="/login">Login</NavLink></div> }
                {!isAuth && <div className="navbar-registration"><NavLink to="/registration">Registration</NavLink></div> }
                {isAuth && <div className="navbar-login" onClick={() => dispatch(logout()) }>Quit</div> }
            </div>
        </div>
    );
};

export default Navbar;