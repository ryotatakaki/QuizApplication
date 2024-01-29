import React from 'react';

function ProgressBar({ current, total }) {
    return (
        <div>
            <p>
                Question {current} of {total}
            </p>
        </div>
    );
}

export default ProgressBar;
