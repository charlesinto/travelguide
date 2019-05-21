import React from 'react';
import { FormField } from "../Common";

const CardDetail = ({ i, state, onChange }) => {
    console.log(i, state, onchange)
    return (
        <div className="row">
            <div className="col-sm-4">
                <div className="form-group">
                    <label htmlFor={`keys-${i}-name`}>Full Name</label>
                    <FormField
                        id={`keys-${i}-name`}
                        icon={'glyphicon-home'}
                        formdata={state.formdata[`keys-${i}-name`]}
                        change={(element) => onChange(element)}
                    />
                </div>
            </div>
            <div className="col-sm-4">
                <div className="form-group">
                    <label htmlFor={`keys-${i}-email`}>Email Address</label>
                    <FormField
                        id={`keys-${i}-email`}
                        icon={'glyphicon-home'}
                        formdata={state.formdata[`keys-${i}-email`]}
                        change={(element) => onChange(element)}
                    />
                </div>
            </div>
            <div className="col-sm-4">
                <div className="form-group">
                    <label htmlFor={`keys-${i}-contact`}>Phone Number</label>
                    <FormField
                        id={`keys-${i}-contact`}
                        icon={'glyphicon-home'}
                        formdata={state.formdata[`keys-${i}-contact`]}
                        change={(element) => onChange(element)}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardDetail;