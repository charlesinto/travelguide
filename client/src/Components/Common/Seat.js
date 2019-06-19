import React, { Component } from 'react';
import SeatAvialable from "../../Resources/images/car/seat_available.svg";
import seatNaN from '../../Resources/images/car/seat_notavailable.svg';
import seatPicked from '../../Resources/images/car/seat_picked.svg';
import { connect } from "react-redux";
import * as actions from "../../Actions";

class Seat extends Component {
    state = {
        isSelected: false
    }
    toggleSelectedSeat(seatnumber) {
        this.setState({
            isSelected: !this.state.isSelected
        })
        this.props.seatSelected(seatnumber)
    }
    renderSeat(seatnumber, isBooked) {
        return isBooked ? (<div
            style={{
                background: `url(${seatNaN})`,
                width: '32px',
                height: '32px',
                backgroundPosition: 'center left',
                backgroundSize: 'cover',
                position: 'relative'
            }}
            className="car car-seat"
        >
            <div className="car seat-numer" style={{ position: 'absolute' }}>{seatnumber}</div>
        </div>) : this.state.isSelected ?
                (
                    <div
                        style={{
                            background: `url(${seatPicked})`,
                            width: '32px',
                            height: '32px',
                            backgroundPosition: 'center left',
                            backgroundSize: 'cover',
                            position: 'relative'
                        }}
                        className="car car-seat car-seat-selected"
                        onClick={() => this.toggleSelectedSeat(seatnumber)}
                    ><div className="car seat-numer" style={{ position: 'absolute' }}>{seatnumber}</div></div>
                )
                : (
                    <div
                        style={{
                            background: `url(${SeatAvialable})`,
                            width: '32px',
                            height: '32px',
                            backgroundPosition: 'center left',
                            backgroundSize: 'cover',
                            position: 'relative'
                        }}
                        className="car car-seat car-seat-selected"
                        onClick={() => this.toggleSelectedSeat(seatnumber)}
                    ><div className="car seat-numer" style={{ position: 'absolute' }}>{seatnumber}</div></div>
                )
    }
    render() {
        const { seatnumber, isBooked } = this.props;
        return (
            <div>
                {this.renderSeat(seatnumber, isBooked)}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {}
}
export default connect(mapStateToProps, actions)(Seat);