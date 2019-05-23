import React, { Component } from 'react';
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCheck, faDownload } from '@fortawesome/fontawesome-free-solid';
import { Button } from "@material-ui/core";

class index extends Component {
    render() {
        return (
            <div className="book_order_details">

                <div className="container-fluid book-page-completed-contaiiner">
                    <div className="row">
                        <div className="col-sm-12 book-success-status-container">
                            <FontAwesomeIcon
                                icon={faCheck}
                                style={{
                                    color: '#55a992',
                                    fontSize: '4.2rem'
                                }}
                            />
                            <div className="book-success">
                                Booking Successful
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 book-complete-download-button">
                            <Button variant="contained" color="secondary" onClick={(e) => { }}>
                                <span style={{ padding: '0 5px' }}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                    />
                                </span>
                                Download
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 desktop-transaction-table-view desktop-view">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col-sm-2">Transaction ID</th>
                                        <th scope="col-sm-2">Company Name</th>
                                        <th scope="col-sm-2">Depature Terminal</th>
                                        <th scope="col-sm-2">Arrival Terminal</th>
                                        <th scope="col-sm-2">Departure Date</th>
                                        <th scope="col-sm-2">Arrival Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>d347nV8MVB</td>
                                        <td >Autostar</td>
                                        <td>Lagos</td>
                                        <td>Enugu</td>
                                        <td>28th July,2019</td>
                                        <td>30th July, 2019</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* <div className="col-sm-12 desktop-transaction-table-view mobile-view" style={{ display: 'none' }}>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col-sm-4">Transaction ID</th>
                                        <th scope="col-sm-4">Company Name</th>
                                        <th scope="col-sm-4">Depature Terminal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>d347nV8MVB</td>
                                        <td >Autostar</td>
                                        <td>Lagos</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="book-completed-divider">Traveller's Details</p>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-sm-12 desktop-transaction-table-view">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col-sm-4">Full Name</th>
                                        <th scope="col-sm-4">Email Address</th>
                                        <th scope="col-sm-4">Contact Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> Charles umadike</td>
                                        <td>charles.onuorah@ra.com</td>
                                        <td>0810987689</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default index;