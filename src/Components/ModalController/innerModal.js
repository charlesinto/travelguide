import React from 'react';
import { Slide } from "react-reveal";

const innerModal = (props) => {
    return (
        <div className="inner-modal">
            <Slide top collapse>
                <div className="modal-view">
                    {props.children}
                </div>
            </Slide>
        </div>
    );
};

export default innerModal;