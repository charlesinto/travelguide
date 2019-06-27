import React, { Component } from 'react';
import Helper from "../Helper";
import carseat from "../../Resources/images/seat.svg";
import { AC, ButtonContainer } from "../Common";

class Card extends Component {
    bookRide(e, id) {
        e.preventDefault()
        this.props.onBookRideClick(id)
    }
    render() {
        const { carName, carImageUrl, companyname,
            carType, price_per_seat, id,
            trip_start_state, trip_end_state, ac, available_seats, startTerminal, arrivalTerminal } = this.props.rideDetail;

        const carUrl = carImageUrl
        const companyName = Helper.capitalize(companyname)
        const ridePrice = price_per_seat
        //const carCapacity = capacity
        return (
            <div>
                <div className="desktop-card">
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
                                            <span className="seat_number">{available_seats} seat(s) available</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ride_price">
                                    <span><strong>&#8358; {ridePrice}</strong></span>
                                </div>
                                {/* <div className="book_action">
                                    <div><button className="btn btn-primary" style={{ width: 'fit-contents' }} onClick={(e) => this.bookRide(e, id)}>View Seats</button></div>
                                </div> */}
                                <ButtonContainer styles={{ margin: 0, height: 'fit-content' }} text={'View Seats'}
                                 onClickHandler={(e) => this.bookRide(e, id)} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="mobile-card" style={{ display: 'none' }}>



                    <div className="mobile-card-view" >
                        <div className="rd-t-view">
                            <h2>{Helper.capitalize(companyname)}</h2>
                            <div
                                style={{
                                    width: '180px',
                                    height: '120px',
                                    background: `url(${carUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />

                        </div>
                        <div className="rd-t-view2">
                            <div className="rd-features">
                                {ac === 1 ? <div className="ac-class" style={{ textAlign: 'center' }}>AC</div> : null}
                            </div>
                            <div className="ride-price-tag">
                                <p>&#8358; {ridePrice}</p>
                            </div>
                            {/* <div className="view-seats-button" onClick={(e) => this.bookRide(e, id)}>
                                View Seats
                            </div> */}
                            <ButtonContainer styles={{
                                padding: '3px 5px', position: 'absolute',
                                bottom: 0,
                                right: 0
                            }}
                                text={'View Seats'} onClickHandler={(e) => this.bookRide(e, id)} />
                        </div>
                    </div>
                    <div className="" style={{ padding: '10px 0px' }}>
                        <span className="make-bold add-padding ">{Helper.capitalize(trip_start_state)}</span>
                        <span className="make-bold ">{`[${Helper.capitalize(startTerminal)}]`}</span>
                        <span className="make-bolder add-margin">===></span>
                        <span className="make-bold add-padding">{Helper.capitalize(trip_end_state)}</span>
                        <span className="make-bold">{`[${Helper.capitalize(arrivalTerminal)}]`}</span>
                    </div>
                    <div className="number_of_seat">
                        <span className="seat_number">{available_seats} seat(s) available</span>
                    </div>
                </div>
            </div>
        );
    }
}

export { Card };