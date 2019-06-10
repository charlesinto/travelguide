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
        const { origin, destination } = user_trip_choice;
        this.props.get_avialableTrips({ startterminalid: parseInt(origin), arrivalterminalid: parseInt(destination) });
    }
    onBookRideClick(id) {
        const selectedRide = this.props.routes.find(item => item.id === id)
        this.props.rideSelected(selectedRide);
        this.props.history.push(`/book/new_trip/${id}/order`)
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
    const { rides: { rides, routes, loading } } = state
    return {
        rides,
        routes,
        loading
    }
}
export default connect(mapStateToProps, actions)(withRouter(index));