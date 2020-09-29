import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../redux/store';
import Button from '../components/Button';

export function FinishedPage() {
	const history = useHistory();

	// Load the config from the Redux store
	const config = useSelector((state: RootState) => state.config);

	function restartSession() {
		history.push('/CountdownPage');
	}

	function backToHome() {
		history.push('/');
	}

	// Calculate how many chords were played
	const chordsPlayed = Math.ceil(config.duration / config.timePerChord);

	return (
		<div className="form__wrapper">
			<h1>Lesson complete</h1>

			<div>
				<h2>Congratulations!</h2>
				<p>
					You completed the series, playing {chordsPlayed} chord(s) across a {config.duration} minute session.
				</p>
			</div>

			<div>
				<Button onClick={restartSession} text="Restart the session" />
				<Button onClick={backToHome} text="Back to home" />
			</div>
		</div>
	);
}

export default FinishedPage;
