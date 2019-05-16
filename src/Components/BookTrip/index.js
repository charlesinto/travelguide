import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Card } from "../Common";
import { connect } from "react-redux";
import * as actions from '../../Actions';

class index extends Component {
    componentDidMount() {
        this.props.fetchRides()
    }
    onBookRideClick(id) {
        const selectedRide = this.props.rides.find(item => item.id === id)
        this.props.rideSelected(selectedRide);
        this.props.history.push(`/book/new_trip/${id}/order`)
    }
    showRides = () => (
        this.props.rides.map((item, i) => (
            <Card
                key={i}
                rideDetail={item}
                onBookRideClick={(id) => this.onBookRideClick(id)}
            />
        ))
    )
    render() {
        return (
            <div>
                <div className="book_order_details">
                    {this.showRides()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    const { rides: { rides } } = state
    return {
        rides
    }
}
export default connect(mapStateToProps, actions)(withRouter(index));