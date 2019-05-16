import React, { Component } from 'react';
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
// import 'react-dates/initialize';
class FormField extends Component {
    showError() {
        const { formdata } = this.props;
        let errorMessage = null;
        if (formdata.validation.required && !formdata.valid) {
            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }
    renderTemplate() {
        const { formdata, change, id, className } = this.props;
        let formTemplate = null;
        switch (formdata.element) {
            case 'input':
                console.log('new value', formdata.value)
                return formTemplate = (
                    <div>
                        <div className={""}>
                            <input
                                value={formdata.value}
                                onChange={(event) => change({ event, id })}
                                {...formdata.config}
                                className={className || "form-control"}
                                id={id}
                                disabled={this.props.disabled}
                                checked={formdata.checkedState ? true : false}
                            />
                        </div>
                        {this.showError()}
                    </div>
                )
            case 'select':
                console.log('new value', formdata.value)
                return formTemplate = (
                    <div className="">
                        {

                        }
                        <select onChange={(event) => change({ event, id })} id={id}
                            value={formdata.value}
                            className={className || "form-control"}
                        >
                            <option value="">Select one</option>
                            {
                                formdata.config.options.map((item, i) => (
                                    <option key={i} value={item.key}>{item.value}</option>
                                ))
                            }
                        </select> {this.showError()}</div>
                )
            case 'date':
                // if(this.props.formdata.config.type === 'single'){

                //     formTemplate = (
                //         <SingleDatePicker 
                //             onDateChange={date => change({ date, id })}
                //             focused={this.props.formdata.focused}
                //             onFocusChange={({ focused }) => onFocusChange({ focused, id })} 
                //             id={id}
                //         />
                //     );
                // }
                return formTemplate
            default:
                return formTemplate
        }
    }
    render() {
        const { formdata } = this.props;
        return (
            <div>
                {
                    formdata.showLabel ? <label htmlFor={this.props.id} className="label_inputs" style={{
                        marginTop: '10px'
                    }}>{formdata.config.label}</label> : null
                }
                {this.renderTemplate()}

            </div>
        );
    }
}

export { FormField };