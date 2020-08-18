import React, { useState, useRef } from 'react'
import CountdownTimer from '../components/CountdownTimer';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const chords = [
	'A',
	'Am',
	'E',
	'Em',
	'Fmaj',
	'D',
	'Dm',
];

export function ChordPage (props) {

	const [currentChord, setCurrentChord] = useState(Math.floor(Math.random() * chords.length));
	const chordTimerReference = useRef(null);

	// Load the config from the Redux store
	const config = useSelector((state) => state.config)

	const history = useHistory()

	function goBack () {
		history.push(`/`)
	}

	function changeChord () {

		// Pick a random chord
		let newChord = Math.floor(Math.random() * chords.length);

		setCurrentChord(newChord);
	}

	function countdownCompleted () {
		// Show the next chord
		changeChord();
		chordTimerReference.current.restartTimer();
	}

	function durationTimerComplete () {
		history.push(`/FinishedPage`)
	}

	return (
		<div className="wrapper">
			<div className="form-wrapper">
				<h2>Play the chord</h2>

				<h1 className='chord'>{chords[currentChord]}</h1>

				<p className='chordTimeRemaining'>Play for <CountdownTimer
						ref={chordTimerReference}
						startingTime={parseInt(config.timePerChord)}
						onComplete={countdownCompleted}
						formatNumber={true}
						className='timeRemainingCountdownTimer' /></p>

				{<p className='totalTimeRemaining'>Total time remaining: <CountdownTimer
						startingTime={parseInt(config.duration)/* * 60*/}
						onComplete={durationTimerComplete}
						formatNumber={true}
						className='timeRemainingCountdownTimer' /></p>}

				<button
					onClick={goBack}
					>Go back</button>
			</div>
		</div>
	)
}

export default ChordPage
