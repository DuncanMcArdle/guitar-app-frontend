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

    restartTimer() {
        // Reset the timer
        this.setState({
            currentTime: this.props.startingTime,
            timer: setTimeout(() => this.updateTimer(), 1000),
        });
    }

    formatTime(seconds) {
        let extension = 'second';
        if(seconds > 60) {
            seconds = Math.ceil(seconds / 60);
            extension = 'minute';
        }
        return `${seconds} ${extension}${(seconds !== 1) ? 's' : ''}`
    }

	updateTimer = () => {

		this.setState({
            currentTime: this.state.currentTime - 1,
        });

        // Check if the countdown has completed
        if(this.state.currentTime <= 0) {

            this.setState({
                currentTime: this.props.startingTime,
            });

            // complete the countdown
            this.props.onComplete();
        }
        else {
            this.setState({
                timer: setTimeout(() => this.updateTimer(), 1000),
            });
        }
	}

    render() {
        return (
            <span>
                {this.props.formatNumber ? this.formatTime(this.state.currentTime) : this.state.currentTime}
            </span>
        )
    }
}

// PropTypes
CountdownTimer.propTypes = {
    startingTime:   PropTypes.number.isRequired,
    onComplete:     PropTypes.func.isRequired,
    formatNumber:   PropTypes.bool.isRequired,
}

export default CountdownTimer