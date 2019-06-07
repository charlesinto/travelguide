import React from 'react';
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from '@fortawesome/fontawesome-free-solid';

const AC = ({ ac }) => {
    return ac === 1 ? (<div className="icon-container">
        <div>
            <FontAwesomeIcon
                icon={faCheck}
                style={{ color: '#fff', width: '16px', height: '16px' }}
            />
        </div>
        <div className="feature">AC</div>
    </div>)
        :
        (<div className="icon-container">
            <div>
                <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: '#fff', width: '16px', height: '16px' }}
                />
            </div>
            <div className="feature">AC</div>
        </div>)
}


export { AC };