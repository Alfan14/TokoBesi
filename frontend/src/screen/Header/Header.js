import React from 'react';
import { useLocation } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import {useNavigate} from 'react-router-dom';


function Header(props) {

    const navigate = useNavigate();
    

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const location = useLocation(); 
    let title = capitalize(location.pathname.substring(1));
    if(location.pathname === '/') {
        title = 'Welcome'
    }
    function renderLogout() {
        if(location.pathname === '/home'){
            return(
                <div className="ml-auto">
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        navigate('/login')
    }
    return(
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">{props.title || title}</span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default Header;