import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LineBreak, AC } from "../Common";
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
        validationMessage: '',
        formdata: {

        },
        travellerDetails: {}
    }
    
    componentDidMount() {

        if ( sessionStorage.getItem('seats') !== null &&
             sessionStorage.getItem('preference') !== null && 
                sessionStorage.getItem('selectedRide') !== null) {
            const tripPreferences = JSON.parse(sessionStorage.getItem('preference'))
            const rideDetail = JSON.parse(sessionStorage.getItem('selectedRide'));
            this.props.fetchState({ tripPreferences, rideDetail }, )
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
        const { carName, carImageUrl, companyname,
            carType, price_per_seat, capacity,
            trip_start_state, trip_end_state, ac,
             startTerminal, arrivalTerminal } = this.props.preference;
        const origin = `${Helper.capitalize(trip_start_state)} [${Helper.capitalize(startTerminal)}]`;
        const destination = `${Helper.capitalize(trip_end_state)} [${Helper.capitalize(arrivalTerminal)}]`;
        const carUrl = carImageUrl
        const companyName = Helper.capitalize(companyname)
        const ridePrice = price_per_seat
        const carCapacity = capacity
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
                                <p>Car Name</p>
                                <p className="p-margin">Available Seats</p>
                                <p>Type</p>
                                <p>Price</p>
                            </div>
                            <div className="trip_headers_values">
                                <p>{companyName}</p>
                                <p>{carCapacity} seats</p>
                                <p>{origin}</p>
                                <p>{destination}</p>
                                <div className="car-name-div-icon">
                                    <span>{carName} </span><AC ac={ac} />
                                </div>
                                <p>Not Available</p>
                                <p>{carType}</p>
                                <p>&#8358; {ridePrice} Per Seat</p>
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
        })
        //() => this.props.modal('Reserve Booking', 'd347nV8MVB')
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
        const {seats} = JSON.parse(sessionStorage.getItem('selectedRide'));
        if(Object.keys(this.state.formdata).length > 0){
            const numberOfLines = seats.length;
            const elements = []
            for (let i = 0; i < numberOfLines; i++) {
                elements.push(<CardDetail count={i} state={this.state} 
                    onChange={(element) => this.onChange(element)} />)
            }
            return (
                <div className="conatiner">
                    <form>
                        {elements.map((item, i) => (
                            <div key={i}>
                                <h3>Traveller {i + 1}</h3>
                                {item}
                            </div>
                        ))}
                    </form>
                </div>
            )
        }else{
            return null
        }
        
    }
    onContinueButtonClick(e) {
        //this.props.history.push('/book/new_trip/book_completed')
        this.props.updateState(this.state.formdata)
        const travellerDetails = this.getTravellerDetails();
        console.log('tavelers details', travellerDetails);
        const { isValid, validationMessage } = this.validateFormData(travellerDetails);
        return isValid ? this.processForm(travellerDetails) : this.showValidationMessage(validationMessage);
    }
    processForm(travellerDetails) {
        const seats = JSON.parse(sessionStorage.getItem('seats'))
        const { depature_date } = JSON.parse(sessionStorage.getItem('preference'))
        const tripDetails = {...this.props.preference, depature_date}
        this.props.processForm(this.state.paymentType, travellerDetails,
            tripDetails, seats)

    }
    showValidationMessage(validationMessage) {
        this.props.modal('Alert', validationMessage)
    }
    validateFormData(travellerDetails) {
        let isValid = true;
        let validationMessage = '';
        for (let i = 0; i < travellerDetails.length; i++) {
            if (travellerDetails[i].fullname.trim() === '' || 
            travellerDetails[i].phonenumber.trim() === '' || travellerDetails[i].email.trim() === '') {
                isValid = false;
                validationMessage = 'Incomplete/Incorrect Form details';
                break;
            }
        }
        if (this.state.paymentType.trim() === '') {
            isValid = false;
            if (validationMessage.trim() === '') {
                validationMessage = 'Please choose a payment method'
            } else {
                validationMessage += ' and please choose a payment method'
            }

        }
        this.setState({
            travellerDetails
        } )
        return { isValid, validationMessage }
    }
    getTravellerDetails() {
        //const number_of_tickets = parseInt(this.props.selectedRide.numberOfSeats);
        //const number_of_tickets = this.props.seats.length;
        const seats = JSON.parse(sessionStorage.getItem('seats'))
        const form = this.state.formdata;
        const passenger_details = [];
        const number_of_tickets = seats.length;
        for (let i = 0; i < number_of_tickets; i++) {
            passenger_details.push({
                fullname: form[`keys-${i}-name`].value,
                email: form[`keys-${i}-email`].value,
                phonenumber: form[`keys-${i}-contact`].value
            })
        }
        return passenger_details;
    }
    render() {
        return (
            <div>
                { !Helper.isEmpty(this.props.preference) ?

            <div>
                <div className="book_order_details">
                    { this.viewRideDetails()}
                </div>
                <div className="view-actions">
                    <Button variant="contained" color="primary" onClick={(e) => this.onContinueButtonClick(e)}>
                        continue
                    </Button>
                </div>
            </div>
                : null
                }
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
    const { selectedRide: { selectedRide, preferences, formdata },
     rides :{ seats }} = state;
     const preference = { ...preferences, ...selectedRide}
    return {
        selectedRide,
        preference,
        preferences,
        formdata,
        seats
    }
}
export default connect(mapStateToProps, actions)(withStyles(customStyle)((withRouter(TripDetails))));