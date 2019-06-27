import React from 'react';
import { FormField } from "../Common";

const CardDetail = ({ count, state, onChange }) => {
    return (
        <div className="row">
            <div className="col-sm-4">
                <div className="form-group">
                    <label htmlFor={`keys-${count}-name`}>Full Name</label>
                    <FormField
                        id={`keys-${count}-name`}
                        icon={'glyphicon-home'}
                        formdata={state.formdata[`keys-${count}-name`]}
                        change={(element) => onChange(element)}
                    />
                </div>
            </div>
            <div className="col-sm-4">
                <div className="form-group">
                    <label htmlFor={`keys-${count}-email`}>Email Address</label>
                    <FormField
                        id={`keys-${count}-email`}
                        icon={'glyphicon-home'}
                        formdata={state.formdata[`keys-${count}-email`]}
                        change={(element) => onChange(element)}
                    />
                </div>
            </div>
            <div className="col-sm-4">
                <div className="form-group">
                    <label htmlFor={`keys-${count}-contact`}>Phone Number</label>
                    <FormField
                        id={`keys-${count}-contact`}
                        icon={'glyphicon-home'}
                        formdata={state.formdata[`keys-${count}-contact`]}
                        change={(element) => onChange(element)}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardDetail;