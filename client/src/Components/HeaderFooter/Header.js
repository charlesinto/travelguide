import React, { Component } from 'react';
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import IconButton from '@material-ui/core/IconButton';
import { faBars } from '@fortawesome/fontawesome-free-solid';

class Header extends Component {

    render() {
        return (
            <div className="container-fluid header-nav">
                <div className="header">
                    <nav>
                        <div className="company-logo">
                            <Link to="/">travelGuide</Link>
                        </div>
                        <ul className="desktop-links">
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
                        <div className="mobile-links" style={{ display: 'none' }}>
                            <IconButton>
                                <FontAwesomeIcon
                                    icon={faBars}
                                    style={{ color: '#fff', fontSize: '24px' }}
                                />
                            </IconButton>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Header;