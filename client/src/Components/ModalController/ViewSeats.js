import React, { Component } from 'react';
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ButtonContainer } from "../Common";
import * as actions from "../../Actions";
import Seat from "../Common/Seat";
import sterring from "../../Resources/images/car/steering_wheel.svg";
import SeatAvialable from "../../Resources/images/car/seat_available.svg";
import seatNaN from '../../Resources/images/car/seat_notavailable.svg';
import seatPicked from '../../Resources/images/car/seat_picked.svg';

class ViewSeats extends Component {
    state = {
        error: false
    }
    onButtonClick() {
        this.props.modal();
    }
    renderCar(selectedRide, bookedseats) {
        const { capacity } = selectedRide;
        switch (capacity) {
            case 3:
                return this.renderExecutiveSeats(capacity)
            case 14:
                return this.renderBusSeats(capacity)
            default:
                return null
        }
    }
    renderBusSeats(capacity) {
        return (<div className="car-box">
            <div className="containers">
                <div className="rows">
                    <div className="seat">
                        <Seat seatnumber={14} isBooked={this.isSeatBooked(14)} />
                    </div>
                    <div className="seat">
                        <Seat seatnumber={13} isBooked={this.isSeatBooked(12)} />
                    </div>
                    <div className="seat">
                        <Seat seatnumber={12} isBooked={this.isSeatBooked(12)} />
                    </div>
                    <div className="seat">
                        <Seat seatnumber={11} isBooked={this.isSeatBooked(11)} />
                    </div>
                </div>
                <div className="rows">
                    <div className="seat">
                        <Seat seatnumber={10} isBooked={this.isSeatBooked(10)} />
                    </div>
                    <div className="seat">
                        <Seat seatnumber={9} isBooked={this.isSeatBooked(9)} />
                    </div>
                    <div className="seat">
                        <Seat seatnumber={8} isBooked={this.isSeatBooked(8)} />
                    </div>
                </div>
                <div className="rows">
                    <div className="seat">
                        <Seat seatnumber={7} isBooked={this.isSeatBooked(7)} />
                    </div>
                    <div className="seat">
                        <Seat seatnumber={6} isBooked={this.isSeatBooked(6)} />
                    </div>
                    <div className="seat">
                        <Seat seatnumber={5} isBooked={this.isSeatBooked(5)} />
                    </div>
                </div>
                <div className="rows">
                    <div className="seat">
                        <Seat seatnumber={4} isBooked={this.isSeatBooked(4)} />
                    </div>
                    <div className="seat">
                        <Seat seatnumber={3} isBooked={this.isSeatBooked(3)} />
                    </div>
                    <div className="seat">
                        <Seat seatnumber={2} isBooked={this.isSeatBooked(2)} />
                    </div>
                </div>
                <div className="rows">
                    <div className="seat seat-next-to-sterring">
                        <Seat seatnumber={1} isBooked={this.isSeatBooked(1)} />
                    </div>
                    <div className="seat">
                        <div
                            style={{
                                background: `url(${sterring})`,
                                width: '32px',
                                height: '32px'
                            }}
                        />
                    </div>
                </div>
            </div>

        </div>)
    }
    isSeatBooked(seatnumber) {
        const { bookedseats } = this.props.info;
        if (bookedseats) {
            const bookedArray = bookedseats.filter(item => item.seatbooked === seatnumber)
            if (bookedArray.length > 0) {
                return true;
            }
            return false;
        }
        return false;
    }
    renderExecutiveSeats(capacity) {
        return (<div className="car-box">
            <div className="containers">
                <div className="rows">
                    <div className="seat">
                        <Seat seatnumber={2} isBooked={this.isSeatBooked(3)} />
                    </div>
                    <div className="seat">
                        <Seat seatnumber={3} isBooked={this.isSeatBooked(2)} />
                    </div>
                </div>
                <div className="rows">
                    <div className="seat seat-next-to-sterring">
                        <Seat seatnumber={1} isBooked={this.isSeatBooked(1)} />
                    </div>
                    <div className="seat">
                        <div
                            style={{
                                background: `url(${sterring})`,
                                width: '24px',
                                height: '24px'
                            }}
                        />
                    </div>
                </div>
            </div>

        </div>)
    }
    onContinueButtonClick(e){
        e.preventDefault();
        if(this.props.seats.length > 0){
            this.props.modal();
            const { info:{ selectedRide}, seats} = this.props;
            sessionStorage
                .setItem('selectedRide', JSON.stringify({...selectedRide,seats}))
            this.props.history
                .push(`/book/new_trip/${this.props.info.selectedRide.id}/order`)
        }else{
            this.setState({
                error: !this.state.error
            },  () => {
                setTimeout(() => {
                    this.setState({
                        error: !this.state.error
                    })

                }, 5000)
            })

        }
    }
    renderError(){
        return this.state.error ? 
            <div className="error-container">
                Please select one or more seats
            </div> 
            : null
    }
    render() {
        const { selectedRide, bookedseats } = this.props.info;
        return (
            <div>
                <div className="modal-body">
                    <div className="car-container">
                        {this.renderError()}
                        <div className="car-layout">
                            {this.renderCar(selectedRide, bookedseats)}
                        </div>
                    </div>
                    <div className="key-container">
                        <div className="keys">
                            <div className="key-box">
                                <div style={{
                                    background: `url(${seatNaN})`,
                                    width: '32px',
                                    height: '32px',
                                    backgroundSize: 'cover'
                                }} />
                                <p>Not Available</p>
                            </div>
                            <div className="key-box">
                                <div style={{
                                    background: `url(${seatPicked})`,
                                    width: '32px',
                                    height: '32px',
                                    backgroundSize: 'cover'
                                }} />
                                <p>Selected</p>
                            </div>
                            <div className="key-box">
                                <div style={{
                                    background: `url(${SeatAvialable})`,
                                    width: '32px',
                                    height: '32px',
                                    backgroundSize: 'cover'
                                }} />
                                <p>Available</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button variant="outlined" color="secondary" onClick={(e) => this.onButtonClick(e)}>
                        Cancel
                    </Button>

                    <ButtonContainer 
                        className="modal-confirm-button" styles={{ 
                        padding: '5px 16px',
                        margin: '0 .25rem 0 0' }} text={'Continue'} 
                        onClickHandler={(e) => this.onContinueButtonClick(e)} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { rides: { seats } } = state
    return {
        seats
    }
}

export default connect(mapStateToProps, actions)(withRouter(ViewSeats));