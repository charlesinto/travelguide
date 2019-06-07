import React from 'react';
import imagenotfound from "../../Resources/images/404.svg";

const NotFound = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <div
                style={{
                    background: `url(${imagenotfound})`,
                    width: '100px',
                    height: '100px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <p className="not-found">Sorry, no available trips</p>
        </div>
    );
};

export { NotFound };