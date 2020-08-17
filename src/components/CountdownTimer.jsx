import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function CountdownTimer (props) {

    const [currentTime, setCurrentTime] = useState(props.startingTime);

    useEffect(() => {
        const timer=setTimeout(() => {
            updateTimer();
          }, 1000);

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });

	function updateTimer() {

        setCurrentTime(currentTime - 1);
        
        // Check if the countdown has completed
        if(currentTime <= 0) {
            setCurrentTime(props.startingTime);

            // complete the countdown
            props.onComplete();
        }
	}

    return (
        <span>
            {currentTime}
        </span>
    )
}

// PropTypes
CountdownTimer.propTypes = {
    startingTime:   PropTypes.number.isRequired,
    onComplete:     PropTypes.func.isRequired,
}

export default CountdownTimer
