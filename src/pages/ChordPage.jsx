import React, { useState } from 'react'
import CountdownTimer from '../components/CountdownTimer';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const chords = [
	'A',
	'E',
	'F',
];

export function ChordPage (props) {

	const [currentChord, setCurrentChord] = useState(Math.floor(Math.random() * chords.length));

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
	}

	function durationTimerComplete () {
		history.push(`/FinishedPage`)
	}

	return (
		<div className="wrapper">
			<div className="form-wrapper">
				<h2>Play the chord</h2>

				<h1 className='chord'>{chords[currentChord]}</h1>

				<p className='chordTimeRemaining'>Chord time remaining: <CountdownTimer
						startingTime={parseInt(config.timePerChord)}
						onComplete={countdownCompleted}
						className='timeRemainingCountdownTimer' /> second(s)</p>

				{<p className='totalTimeRemaining'>Total time remaining: <CountdownTimer
						startingTime={parseInt(config.duration)/* * 60*/}
						onComplete={durationTimerComplete}
						className='timeRemainingCountdownTimer' /> second(s)</p>}

				<button
					onClick={goBack}
					>Go back</button>
			</div>
		</div>
	)
}

export default ChordPage
