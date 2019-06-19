import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Card, Loading, NotFound } from "../Common";
import { connect } from "react-redux";
import * as actions from '../../Actions';

class index extends Component {
    componentWillMount() {
        this.props.resetLoading();
    }
    componentDidMount() {
        const user_trip_choice = JSON.parse(sessionStorage.getItem('preference'));
        const { origin, destination, depature_date } = user_trip_choice;
        this.props.get_avialableTrips({
            depature_date, startterminalid: parseInt(origin), arrivalterminalid: parseInt(destination)
        });
    }
    onBookRideClick(id) {
        const { depature_date } = JSON.parse(sessionStorage.getItem('preference'));
        const selectedRide = this.props.routes.find(item => item.id === id)

        const bookedseats = this.props.bookedseats.filter(item =>
            item.routeid === id && this.compareDate(item, depature_date));
        this.props.modal('viewSeats', { selectedRide, bookedseats });
    }
    compareDate(item, depature_date) {
        const date = new Date(item.datebooked);
        const fullYear = date.getFullYear()
        const month = 1 + date.getMonth() >= 10 ? 1 + date.getMonth() : `0${1 + date.getMonth()}`
        const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
        const datebooked = `${fullYear}-${month}-${day}`
        return datebooked === depature_date
    }
    showRides = () => (
        this.props.routes.map((item, i) => (
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
                {
                    this.props.loading ? <Loading /> :
                        <div className="book_order_details">
                            {this.props.routes.length > 0 ? this.showRides() : <NotFound />}
                        </div>
                }

            </div>
        );
    }
}
const mapStateToProps = state => {
    const { rides: { rides, routes, loading, bookedseats } } = state
    return {
        rides,
        routes,
        loading,
        bookedseats
    }
}
export default connect(mapStateToProps, actions)(withRouter(index));