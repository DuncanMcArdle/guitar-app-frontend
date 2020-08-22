import React, { Component } from 'react';
import PropTypes from 'prop-types';

function formatTime(timeInSeconds) {
	let seconds = timeInSeconds;
	let extension = 'second';
	if (seconds > 60) {
		seconds = Math.ceil(timeInSeconds / 60);
		extension = 'minute';
	}
	return `${seconds} ${extension}${(seconds !== 1) ? 's' : ''}`;
}

export class CountdownTimer extends Component {
	constructor(props) {
		super(props);

		const { startingTime } = this.props;

		this.state = {
			currentTime: startingTime,
			timer: null,
		};
	}

	componentDidMount() {
		this.setState({
			timer: setTimeout(() => this.updateTimer(), 1000),
		});
	}

	componentWillUnmount() {
		const { timer } = this.state;
		clearTimeout(timer);
	}

	updateTimer = () => {
		const { currentTime } = this.state;
		const { onComplete, startingTime } = this.props;

		this.setState({
			currentTime: currentTime - 1,
		});

		// Check if the countdown has completed
		if (currentTime <= 1) {
			this.setState({
				currentTime: startingTime,
			});

			// Complete the countdown
			onComplete();
		} else {
			this.setState({
				timer: setTimeout(() => this.updateTimer(), 1000),
			});
		}
	}

	restartTimer() {
		const { startingTime } = this.props;

		// Reset the timer
		this.setState({
			currentTime: startingTime,
			timer: setTimeout(() => this.updateTimer(), 1000),
		});
	}

	render() {
		const { currentTime } = this.state;
		const { formatNumber } = this.props;

		return (
			<span>
				{formatNumber ? formatTime(currentTime) : currentTime}
			</span>
		);
	}
}

// PropTypes
CountdownTimer.propTypes = {
	startingTime:	PropTypes.number.isRequired,
	onComplete:		PropTypes.func.isRequired,
	formatNumber:	PropTypes.bool.isRequired,
};

export default CountdownTimer;
