import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LineBreak } from "../Common";
import * as actions from "../../Actions";
import CardDetail from "./CardDetail";
import Helper from ".././Helper";
import { Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

class TripDetails extends Component {

    state = {
        paymentType: '',
        formdata: {

        }
    }
    componentDidMount() {
        if (sessionStorage.getItem('preference') !== null && sessionStorage.getItem('selectedRide') !== null) {
            const tripPreferences = JSON.parse(sessionStorage.getItem('preference'))
            const rideDetail = JSON.parse(sessionStorage.getItem('selectedRide'));
            this.props.fetchState({ tripPreferences, rideDetail })
        } else {
            this.props.history.push('/')
        }

    }
    isObjectEmpty(obj) {
        return Object.keys(obj).length > 0 ? false : true
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            formdata: nextProps.formdata,
        });
    }
    viewRideDetails() {
        const { preferences:
            { carUrl, companyName, carType, carCapacity, ridePrice },
            selectedRide: { origin, destination } } = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <div
                            className="card-frame"
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
                        <LineBreak />
                        <h2 className="header-title">Passenger Details</h2>
                        {this.fillContactDetails()}
                        <LineBreak />
                        <h2 className="header-title">Payment Options</h2>
                        {this.paymentMethod()}
                    </div>
                </div>
            </div>
        )
    }
    onPaymentOptionSelectedChange(event) {
        this.setState({
            paymentType: event.target.value
        }, () => this.props.modal('Reserve Booking', 'd347nV8MVB'))
    }
    paymentMethod() {
        const { classes } = this.props;
        return (
            <FormControl classes={{ root: classes.formcontrolRoot }}>
                <RadioGroup
                    aria-label="paymentType"
                    name="payment-type"
                    value={this.state.paymentType}
                    classes={{ root: classes.root }}
                    onChange={(e) => this.onPaymentOptionSelectedChange(e)}
                >
                    <FormControlLabel
                        value="Reserve Booking"
                        control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                        label="Reserve Booking"
                    />
                    <FormControlLabel
                        value="Pay Online"
                        control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                        label="Pay Online"
                    />
                    <FormControlLabel
                        value="Pay On Arrival"
                        control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                        label="Pay On Arrival"
                    />
                </RadioGroup>
            </FormControl>
        )
    }
    onChange(element) {
        const newFormData = Helper.update(element, this.state.formdata, 'register')
        this.setState({
            formError: false,
            formdata: { ...newFormData }
        })
    }
    fillContactDetails() {
        const numberOfLines = this.props.selectedRide.numberOfSeats;
        const elements = []
        for (let i = 0; i < numberOfLines; i++) {
            elements.push(<CardDetail i={i} state={this.state} onChange={(element) => this.onChange(element)} />)
        }
        return (
            <div className="conatiner">
                <form>
                    {elements.map((item, i) => (
                        <div key={i}>
                            {item}
                        </div>
                    ))}
                </form>
            </div>
        )
    }
    onContinueButtonClick(e) {
        this.props.history.push('/book/new_trip/book_completed')
    }
    render() {
        return (
            <div>
                <div className="book_order_details">
                    {this.viewRideDetails()}
                </div>
                <div className="view-actions">
                    <Button variant="contained" color="primary" onClick={(e) => this.onContinueButtonClick(e)}>
                        continue
                    </Button>
                </div>
            </div>
        );
    }
}

const customStyle = theme => ({
    formcontrolRoot: {
        width: '100%'
    },
    root: {
        flexDirection: 'row !important',
        margin: '0 auto'
    },
    radio: {
        '&$checked': {
            color: '#061250'
        }
    },
    checked: {}
})
const mapStateToProps = state => {
    const { selectedRide: { selectedRide, preferences, formdata } } = state;
    return {
        selectedRide,
        preferences,
        formdata
    }
}
export default connect(mapStateToProps, actions)(withStyles(customStyle)((withRouter(TripDetails))));