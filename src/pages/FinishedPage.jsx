import React, { Component } from 'react'
import CountdownTimer from '../components/CountdownTimer';
import { useHistory } from "react-router-dom";

export class FinishedPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dataInput:		props.location.data,
			duration:		props.location.data.duration,
			chordsPlayed:	Math.ceil(props.location.data.duration / props.location.data.timePerChord),

			// Restore the session data in case the user restarts
			timePerChord: props.location.data.timePerChord,
			duration: props.location.data.duration,
			initialCountdown: props.location.data.initialCountdown,
			dataInput: props.location.data,
		};
	}

	restartSession = () => {
		this.props.history.push({
			pathname: '/CountdownPage',
			data: this.state,
		});
	}

	backToHome = () => {
		this.props.history.push({
			pathname: '/',
		});
	}

	render() {
		return (
			<div className="wrapper">
				<div className="form-wrapper">
					<h2>Congratulations!</h2>

					<p>You completed the series, playing {this.state.chordsPlayed} chord(s) acorss a {this.state.duration} minute session.</p>

					<button onClick={this.restartSession}>Restart the session</button>
					<br />
					<button onClick={this.backToHome}>Back to home</button>
				</div>
			</div>
		)
	}
}

export default FinishedPage
