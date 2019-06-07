import React, { Component } from 'react';
import Helper from "../Helper";
import carseat from "../../Resources/images/seat.svg";
import { AC } from "../Common";

class Card extends Component {
    bookRide(e, id) {
        e.preventDefault()
        this.props.onBookRideClick(id)
    }
    render() {
        const { carName, carImageUrl, companyname,
            carType, price_per_seat, capacity, id,
            trip_start_state, trip_end_state, ac, startTerminal, arrivalTerminal } = this.props.rideDetail;

        const carUrl = carImageUrl
        const companyName = Helper.capitalize(companyname)
        const ridePrice = price_per_seat
        const carCapacity = capacity
        return (
            <div className="card_container">
                <div className="car_image"
                    style={{
                        background: `url(${carUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '270px',
                        height: '200px',
                    }}

                >

                </div>
                <div className="c_details">
                    <div className="c_details_row_one">
                        <div className="" style={{ textAlign: 'center' }}>
                            <span className="make-bold add-padding ">{Helper.capitalize(trip_start_state)}</span>
                            <span className="make-bold ">{`[${Helper.capitalize(startTerminal)}]`}</span>
                            <span className="make-bolder add-margin">===></span>
                            <span className="make-bold add-padding">{Helper.capitalize(trip_end_state)}</span>
                            <span className="make-bold">{`[${Helper.capitalize(arrivalTerminal)}]`}</span>
                        </div>
                        <div>
                            <div>
                                <div className='mark-feature'>
                                    <AC ac={ac} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="c_details_row_two">
                        <div className="company_details">
                            <div className="company_name">
                                <span>{companyName}</span>
                            </div>
                            <div className="car_name">
                                <span>{Helper.capitalize(carName)}</span>
                            </div>
                            <div className="car_type">
                                <span>{Helper.capitalize(carType)}</span>
                            </div>
                            <div className="car_capacity">
                                <div
                                    style={{
                                        background: `url(${carseat})`,
                                        width: '32px',
                                        height: '32px'
                                    }}
                                >
                                </div>
                                <div className="number_of_seat">
                                    <span className="seat_number">{carCapacity} seats</span>
                                </div>
                            </div>
                        </div>
                        <div className="ride_price">
                            <span><strong>&#8358; {ridePrice}</strong></span>
                        </div>
                        <div className="book_action">
                            <div><button className="btn btn-primary" onClick={(e) => this.bookRide(e, id)}>Book</button></div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export { Card };