import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CountdownTimer } from '../components/CountdownTimer';
import { RootState } from '../redux/store';
import Button from '../components/Button';

// Array of chords, starting with basic, then advanced, then expert
const chords = ['A', 'Am', 'E', 'Em', 'Fmaj', 'D', 'Dm'];
const numberOfBasicChords = 4;
const numberOfAdvancedChords = 6;

export function ChordPage() {
	const [currentChord, setCurrentChord] = useState(Math.floor(Math.random() * chords.length));
	const chordTimerReference = useRef<CountdownTimer>(null);

	// Load the config from the Redux store
	const config = useSelector((state: RootState) => state.config);

	const history = useHistory();

	function goBack() {
		history.push('/');
	}

	function changeChord() {
		// Calculate how many chords to choose from
		let maxChords;
		switch (config.chords.toUpperCase()) {
			case 'BASIC': {
				maxChords = numberOfBasicChords;
				break;
			}
			case 'ADVANCED': {
				maxChords = numberOfAdvancedChords;
				break;
			}
			default: {
				maxChords = chords.length;
				break;
			}
		}

		// Pick a random chord
		const newChord = Math.floor(Math.random() * maxChords);

		setCurrentChord(newChord);
	}

	function countdownCompleted() {
		// Show the next chord
		changeChord();

		// Restart the timer (if not null)
		if (chordTimerReference.current !== null) {
			chordTimerReference.current.restartTimer();
		}
	}

	function durationTimerComplete() {
		history.push('/FinishedPage');
	}

	return (
		<div className="form__wrapper">
			<h1>Play the chord</h1>

			<div>
				<h1 className="chord">{chords[currentChord]}</h1>

				{config.showChord.toUpperCase() === 'YES' && <p className="currentChord">(would be showing the chord here)</p>}

				<p className="chordTimeRemaining">
					Play for{' '}
					<CountdownTimer
						ref={chordTimerReference}
						startingTime={Number(config.timePerChord)}
						onComplete={countdownCompleted}
						formatNumber
					/>
				</p>

				<p className="totalTimeRemaining">
					Total time remaining:{' '}
					<CountdownTimer startingTime={Number(config.duration) * 60} onComplete={durationTimerComplete} formatNumber />
				</p>
			</div>

			<Button onClick={goBack} text="Go back" />
		</div>
	);
}

export default ChordPage;
