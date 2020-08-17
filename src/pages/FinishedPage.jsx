import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

export function FinishedPage (props) {

	const history = useHistory()

	// Load the config from the Redux store
	const config = useSelector((state) => state.config)

	function restartSession () {
		history.push(`/CountdownPage`)
	}

	function backToHome () {
		history.push(`/`)
	}

	// Calculate how many chords were played
	let chordsPlayed = Math.ceil(config.duration / config.timePerChord)

	return (
		<div className="wrapper">
			<div className="form-wrapper">
				<h2>Congratulations!</h2>

				<p>You completed the series, playing {chordsPlayed} chord(s) acorss a {config.duration} minute session.</p>

				<button onClick={restartSession}>Restart the session</button>
				<br />
				<button onClick={backToHome}>Back to home</button>
			</div>
		</div>
	)
}

export default FinishedPage
