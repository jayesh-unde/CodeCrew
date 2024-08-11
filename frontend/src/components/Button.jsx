import React from 'react';

const Button = ({ onClick, color, children }) => {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#555', // Darker button background
                color: 'white', // Light text for readability
                padding: '0.5em 1em',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '2em'                
            }}
        >
            {children}
        </button>
    );
};

export default Button;
