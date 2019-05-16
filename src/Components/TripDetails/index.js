import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Actions";
class TripDetails extends Component {
    componentDidMount() {

    }
    isObjectEmpty(obj) {
        return Object.keys(obj).length > 0 ? false : true
    }
    viewRideDetails() {
        const { selectedRide:
            { carUrl, companyName, carType, carCapacity, ridePrice },
            preferences: { origin, destination } } = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <div
                            style={{
                                backgroundImage: `url(${carUrl})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '320px',
                            }}
                        >
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="c_trip_o_header">
                            <div className="trip_headers">
                                <p> Transport Company</p>
                                <p> Capacity</p>
                                <p> From</p>
                                <p> To</p>
                                <p>Available Seats</p>
                                <p>Type</p>
                                <p>Price</p>
                            </div>
                            <div className="trip_headers_values">
                                <p>{companyName}</p>
                                <p>{carCapacity}</p>
                                <p>{origin}</p>
                                <p>{destination}</p>
                                <p>Not Available</p>
                                <p>{carType}</p>
                                <p>&#8358; {ridePrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                <div className="book_order_details">
                    {this.isObjectEmpty(this.props.selectedRide) ? null :

                        this.viewRideDetails()
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    const { selectedRide: { selectedRide, preferences } } = state;
    return {
        selectedRide,
        preferences,
    }
}
export default connect(mapStateToProps, actions)(withRouter(TripDetails));