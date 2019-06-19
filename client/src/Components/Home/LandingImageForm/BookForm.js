import React, { Component } from 'react';
import { connect } from "react-redux";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import * as actions from '../../../Actions'
import Helper from "../../Helper";
import { FormField } from "../../Common";
import { MAX_DAY } from "../../../Actions/types";
import { withRouter } from "react-router-dom";
import axios from "axios";

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
                    options: [],
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
                    options: [],
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

        },
        terminals: []
    }
    componentDidMount() {
        this.getRoutes();
    }
    async getRoutes() {
        try {
            const response = await axios.get('/api/v1/trips');
            const { status, data: { terminals } } = response;
            if (status === 200) {
                const formdata = Helper
                    .populateDropdown(this.state.formdata, { origin: terminals });

                this.setState({
                    formdata,
                    terminals
                })
            }
        } catch (err) {
            console.log('error', err);
        }

    }
    onChange(element) {
        const newFormData = Helper.update(element, this.state.formdata, 'register')
        this.setState({
            formError: false,
            formdata: { ...newFormData }
        }, () => {
            if (element.id === 'origin') {
                const selectedId = this.state.formdata[element.id].value;
                const selectedItem = this.state.terminals.filter(item => item.id === parseInt(selectedId))
                const { state } = selectedItem[0];
                const arrivaldestinations = this.state.terminals.filter(item => item.state !== state);
                const newFormData = Helper.resetField(this.state.formdata, 'destination');
                const filteredDropDownFormdata = Helper.populateDropdown(newFormData, { destination: arrivaldestinations })
                this.setState({
                    formdata: filteredDropDownFormdata
                })
            }
        })

    }
    handleDayChange(value, id) {
        const newFormData = { ...this.state.formdata };
        newFormData[id].value = this.formatDate(value);
        newFormData[id].valid = true;
        this.setState({
            formdata: { ...newFormData }
        })
    }
    formatDate(date) {
        const dateSelected = new Date(date);
        const month = parseInt(dateSelected.getMonth()) < 10 ?
            '0' + (parseInt(dateSelected.getMonth()) + 1) : (parseInt(dateSelected.getMonth()) + 1);
        const day = parseInt(dateSelected.getDate()) < 10 ? '0' + dateSelected.getDate() : dateSelected.getDate();
        return `${dateSelected.getFullYear()}-${month}-${day}`;
    }
    onBookNow(e) {
        e.preventDefault();
        let dataToSubmit = {};
        if (this.state.formdata['tripType'].value === 'return trip') {
            dataToSubmit = Helper.validateForm(this.state.formdata, 'login');
        } else {
            const newFormData = { ...this.state.formdata };
            newFormData.arrival_date.valid = true;
            dataToSubmit = Helper.validateForm(newFormData, 'login');
        }
        if (!dataToSubmit.isValid) {
            return this.setState({ formError: true })
        }
        console.log(dataToSubmit.record);
        this.props.bookTrip(dataToSubmit.record);
        this.props.history.push('/book/new_trip');
    }
    getLimitDay() {
        const today = new Date();
        const limitday = today.getDate() + MAX_DAY;
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), limitday);

        return tomorrow
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
                                    <div>
                                        <label htmlFor="depature_date">Depature Date</label>
                                    </div>
                                    <div>
                                        <DayPickerInput
                                            placeholder={'YYYY-MM-DD'}
                                            dayPickerProps={{
                                                modifiers: {
                                                    highlighted: new Date(),
                                                    disabled: [
                                                        {
                                                            before: new Date(),

                                                        },
                                                        {
                                                            after: this.getLimitDay()
                                                        }
                                                    ]
                                                }
                                            }}
                                            component={props => <input {...props} id={'depature_date'} readOnly={'readonly'} />}
                                            onDayChange={(value) => this.handleDayChange(value, 'depature_date')}
                                        />
                                    </div>
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
                                            <div>
                                                <label htmlFor="depature_date">Arrival Date</label>
                                            </div>
                                            <div>
                                                <DayPickerInput
                                                    placeholder={'YYYY-MM-DD'}
                                                    dayPickerProps={{
                                                        modifiers: {
                                                            highlighted: new Date(),
                                                            disabled: [
                                                                {
                                                                    before: new Date(),

                                                                },
                                                                {
                                                                    after: this.getLimitDay()
                                                                }
                                                            ]
                                                        }
                                                    }}
                                                    component={props => <input {...props} id={'arrival_date'} readOnly={'readonly'} />}
                                                    onDayChange={(value) => this.handleDayChange(value, 'arrival_date')}
                                                />
                                            </div>
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