import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../Actions'
import Helper from "../../Helper";
import { FormField } from "../../Common";
import { withRouter } from "react-router-dom";

class BookForm extends Component {
    state = {
        activeLink: 'oneWayTrip',
        formError: false,
        formSuccess: '',
        formdata: {
            origin: {
                element: 'select',
                value: '',
                config: {
                    label: 'From:',
                    name: 'origin_dp_input',
                    options: [
                        { key: 'ajah -> lagos', value: 'ajah -> lagos' },
                        { key: 'oshodi -> lagos', value: 'oshodi -> lagos' }
                    ],
                    type: 'select',
                    placeholder: 'Departure Terminal'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            destination: {
                element: 'select',
                value: '',
                config: {
                    label: 'From:',
                    name: 'dp_input',
                    options: [
                        { keys: 'Enugu', value: 'Enugu' },
                        { keys: 'Abuja', value: 'Abuja' }
                    ],
                    type: 'select',
                    placeholder: 'Departure Terminal'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            numberOfSeats: {
                element: 'select',
                value: '',
                config: {
                    label: 'To:',
                    name: 'number_of_seats_input',
                    options: [
                        { key: '1', value: '1' },
                        { key: '2', value: '2' },
                        { key: '3', value: '3' }
                    ],
                    type: 'select',
                    placeholder: 'Departure Terminal'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            depature_date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Departure Date',
                    name: 'dp_terminal_input',
                    options: [],
                    type: 'date',
                    placeholder: ''
                },
                validation: {
                    required: true,
                },
                focused: null,
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            tripType: {
                element: 'input',
                value: 'return trip',
                checkedState: true,
                config: {
                    label: 'Departure Date',
                    name: 'trip_type',
                    value: 'Return Trip',
                    type: 'checkbox',
                    placeholder: ''
                },
                validation: {
                    required: true,
                },
                focused: null,
                valid: true,
                validationMessage: '',
                showLabel: false
            },
            arrival_date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Departure Date',
                    name: 'arrival_input',
                    type: 'date',
                    placeholder: ''
                },
                validation: {
                    required: true,
                },
                focused: null,
                valid: false,
                validationMessage: '',
                showLabel: false
            }

        }
    }
    onChange(element) {
        console.log(element)
        const newFormData = Helper.update(element, this.state.formdata, 'register')
        this.setState({
            formError: false,
            formdata: { ...newFormData }
        }, () => console.log('new sae', this.state.formdata))
    }
    onBookNow(e) {
        e.preventDefault();
        const dataToSubmit = Helper.validateForm(this.state.formdata, 'login');
        if (!dataToSubmit.isValid) {
            return this.setState({ formError: true })
        }
        console.log(dataToSubmit.record);
        this.props.bookTrip(dataToSubmit.record);
        this.props.history.push('/book/new_trip');
    }
    render() {
        return (
            <div className="booking-form">
                <div className="contaniner form-container">
                    <div className="row">
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-8 form">
                            <form noValidate>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="origin">Travelling From</label>
                                            <FormField
                                                id={'origin'}
                                                icon={'glyphicon-home'}
                                                formdata={this.state.formdata['origin']}
                                                change={(element) => this.onChange(element)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="destination">Travelling To</label>
                                            <FormField
                                                id={'destination'}
                                                icon={'glyphicon-home'}
                                                formdata={this.state.formdata['destination']}
                                                onFocusChange={(focus) => console.log(focus)}
                                                change={(element) => this.onChange(element)}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="numberOfSeats">Seats</label>
                                    <FormField
                                        id={'numberOfSeats'}
                                        icon={'glyphicon-home'}
                                        formdata={this.state.formdata['numberOfSeats']}
                                        onFocusChange={(focus) => console.log(focus)}
                                        change={(element) => this.onChange(element)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="depature_date">Depature Date</label>
                                    <FormField
                                        id={'depature_date'}
                                        icon={'glyphicon-home'}
                                        formdata={this.state.formdata['depature_date']}
                                        onFocusChange={(focus) => console.log(focus)}
                                        change={(element) => this.onChange(element)}
                                    />
                                </div>
                                <div className="form-check">
                                    <FormField
                                        id={'tripType'}
                                        icon={'glyphicon-home'}
                                        className="form-check-input"
                                        formdata={this.state.formdata['tripType']}
                                        onFocusChange={(focus) => console.log(focus)}
                                        change={(element) => this.onChange(element)}

                                    />

                                    <label className="form-check-label" htmlFor="tripType">
                                        Return Trip
                                    </label>
                                </div>
                                {
                                    this.state.formdata['tripType'].checkedState ?

                                        <div className="form-group">
                                            <label htmlFor="arrival_date">Arrival Date</label>
                                            <FormField
                                                id={'arrival_date'}
                                                icon={'glyphicon-home'}
                                                formdata={this.state.formdata['arrival_date']}
                                                onFocusChange={(focus) => console.log(focus)}
                                                change={(element) => this.onChange(element)}

                                            />
                                        </div>
                                        : null
                                }



                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button type="submit" className="btn btn-primary" onClick={(e) => this.onBookNow(e)}>Book Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {

    }
}
export default connect(mapStateToProps, actions)(withRouter(BookForm));