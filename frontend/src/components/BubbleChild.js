import React from 'react';

export default function BubbleChild(props) {
    return (
        <div className="bubble-child">
            <h3 className="bubble-child-summary">
                { props.summary }
            </h3>
        </div>
    );
}