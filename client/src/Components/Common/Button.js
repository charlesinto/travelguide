import React from 'react';

const ButtonContainer = ({ onClickHandler, styles, text }) => {

    return (
        <div className="view-seats-button" style={{ ...styles }} onClick={(e) => onClickHandler(e)}>
            {text}
        </div>
    );
};

export { ButtonContainer };