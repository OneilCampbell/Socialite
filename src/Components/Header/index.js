import React from "react";
import { Link } from 'react-router-dom';
import "./style.css";

const Header = (props) => {
    return (
        <header>
            <nav>
                <Link to={`/users/${props.id}`}>Profile</Link>
                <Link to={"/timeline"}>Timeline</Link>
            </nav>
        </header>
    );
}

export default Header;