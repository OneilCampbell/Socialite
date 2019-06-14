import React from "react";
import { Link } from 'react-router-dom';
import "./style.css";

const Header = (props) => {
    return (
        <header>
            <nav>
                <Link to={{pathname:"/users", state:{...props.userInfo}}}>Profile</Link>
                <Link to={{pathname:"/timeline", state:{...props}}}>Timeline</Link>
                <span className="move-right"> <Link to="/">Log Out</Link> </span>
            </nav>
        </header>
    );
}

export default Header;