import React, { Component } from 'react'
import CountdownTimer from '../components/CountdownTimer';

const chords = [
	'A',
	'E',
	'F',
];

export class ChordPage extends Component {

	

	constructor(props) {
		super(props);

		// Manually set data (TESTING ONLY)
		/*props.location.data = new Object;
		props.location.data.timePerChord = 2;
		props.location.data.duration = 3;*/

		// Pick the first chord

		this.state = {
			currentChord: 0,
			countdownTimerElement: React.createRef(),
			timePerChord: props.location.data.timePerChord,
			duration: parseInt(props.location.data.duration),
			dataInput: props.location.data,
		};

		console.log(props.location.data);
	}

	goBack = () => {
		this.props.history.go(-2);
	}

	changeChord = () => {

		// Pick a random chord
		let newChord = Math.floor(Math.random() * chords.length);

		this.setState({
			currentChord: newChord,
			timePerChord: this.state.timePerChord,
		});

		console.log(`Calling inner function`);
		this.state.countdownTimerElement.current.innerFunction('test123');
	}

	countdownCompleted = () => {

		// Show the next chord

		this.changeChord();
	}

	durationTimerComplete = () => {
		this.props.history.push({
			pathname: '/FinishedPage',
			data: this.state,
		});
	}

	render() {

		return (
			<div className="wrapper">
				<div className="form-wrapper">
					<h2>Play the chord</h2>

					<h1 className='chord'>{chords[this.state.currentChord]}</h1>

					<p className='chordTimeRemaining'>Chord time remaining: <CountdownTimer
							ref={this.state.countdownTimerElement}
							startingTime={parseInt(this.state.timePerChord)}
							onComplete={this.countdownCompleted}
							className='timeRemainingCountdownTimer' /> second(s)</p>

					{<p className='totalTimeRemaining'>Total time remaining: <CountdownTimer
							startingTime={this.state.duration/* * 60*/}
							onComplete={this.durationTimerComplete}
							className='timeRemainingCountdownTimer' /> second(s)</p>}

					<button
						onClick={this.goBack}
						>Go back</button>
				</div>
			</div>
		)
	}
}

export default ChordPage
