import React, { Component } from 'react';

class Card extends Component {
    bookRide(e, id) {
        e.preventDefault()
        this.props.onBookRideClick(id)
    }
    render() {
        const { carUrl, companyName, carType, carCapacity, ridePrice, id } = this.props.rideDetail;
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
                <div className="company_details">
                    <div className="company_name">
                        <span>{companyName}</span>
                    </div>
                    <div className="car_type">
                        <span>{carType}</span>
                    </div>
                    <div className="car_capacity">
                        <span>{carCapacity}</span>
                    </div>
                </div>
                <div className="ride_price">
                    <span><strong>&#8358; {ridePrice}</strong></span>
                </div>
                <div className="book_action">
                    <div><button className="btn btn-primary" onClick={(e) => this.bookRide(e, id)}>Book</button></div>
                </div>
            </div>
        );
    }
}

export { Card };