import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Header extends Component {

    render() {
        return (
            <div className="container-fluid header-nav">
                <div className="header">
                    <nav>
                        <div className="company-logo">
                            <Link to="/">travelGuide</Link>
                        </div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/">About Us</Link>
                            </li>
                            <li>
                                <Link to="/">Contact Us</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Header;