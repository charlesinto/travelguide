import React from 'react';
import LoadingSvg from "../../Resources/images/loading.svg";

const Loading = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
                style={{
                    background: `url(${LoadingSvg})`,
                    width: '100px',
                    height: '100px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
        </div>
    );
};

export { Loading };