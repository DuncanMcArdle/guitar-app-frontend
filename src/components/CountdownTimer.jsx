import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CountdownTimer extends Component {

    constructor(props) {
        super (props);

        this.state = {
            currentTime: this.props.startingTime,
            timer: null,
        }
    }

	componentDidMount() {
		this.setState({
            timer: setTimeout(() => this.updateTimer(), 1000),
        });
    }
    
    componentWillUnmount() {
        clearTimeout(this.state.timer)
    }

    innerFunction(param) {
        console.log(`Inner function called with parameter ${param}`);

        // Reset the timer
        this.setState({
            currentTime: this.props.startingTime,
            timer: setTimeout(() => this.updateTimer(), 1000),
        });
    }

	updateTimer = () => {

		this.setState({
            currentTime: this.state.currentTime - 1,
        });
        
        // Check if the countdown has completed
        if(this.state.currentTime <= 0) {
            // complete the countdown
            this.props.onComplete();
        }
        else
        {
            // Call the tick function (if supplied)
            this.props.onTick && this.props.onTick();

            this.setState({
                timer: setTimeout(() => this.updateTimer(), 1000),
            });
        }
	}

    render() {
        return (
            <span>
                {this.state.currentTime}
            </span>
        )
    }
}

// PropTypes
CountdownTimer.propTypes = {
    startingTime:   PropTypes.number.isRequired,
    onComplete:     PropTypes.func.isRequired,
}

export default CountdownTimer
