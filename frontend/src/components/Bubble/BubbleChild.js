import React from 'react';

export const BubbleChild = props => {
    return (
        <div className="bubble-child">
            <h3 className="bubble-child-summary">
                { props.summary }
            </h3>
        </div>
    );
}