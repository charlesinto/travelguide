import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <div className="page-footer" style={{ padding: '20px 0px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12" style={{ display: 'flex' }}>
                            <div className="col-sm-6">
                                <p><Link to="#"> Home</Link></p>
                                <p><Link to="#"> Contact </Link></p>
                                <p><Link to="#">About Us</Link></p>
                            </div>
                            <div className="col-sm-6">
                                <p>Payment Options</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;