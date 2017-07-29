import React from 'react';

export default function(props) {
    return (
        <div className={`inline errorMessage ${props.bugView ? 'textColorYellow' : 'textColorRed'}`}>
            {props.error}
        </div>
    );
}
