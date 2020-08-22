import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setConfig } from '../apples/configSlice';

export function HomePage() {
	// Default state values
	const [config, setLocalConfig] = useState({
		chords: '-1',
		showChord: '-1',
		initialCountdown: 3,
		timePerChord: 5,
		duration: 2,
		errors: {
			chords: '',
			showChord: '',
			initialCountdown: '',
			timePerChord: '',
			duration: '',
		},
	});

	// Redux
	const dispatch = useDispatch();
	const history = useHistory();

	// Validate a form field
	function validateFormField(fieldName, value) {
		const { errors } = config;

		// Reset any existing errors
		errors[fieldName] = '';

		switch (fieldName) {
			case 'chords':
			case 'showChord': {
				errors[fieldName] = (value === '-1' ? 'Please select an option' : '');
				break;
			}

			case 'timePerChord': {
				if (value < 1 || value > 60) {
					errors[fieldName] = 'Please enter between 1 and 60 seconds';
				}
				break;
			}

			case 'initialCountdown':
			case 'duration': {
				if (value < 1 || value > 60) {
					errors[fieldName] = 'Please enter between 1 and 60 minutes';
				}
				break;
			}

			default: {
				console.error(`Unrecognised input found - no validation in place for '${fieldName}'`);
			}
		}

		// Set the input's state and new value
		setLocalConfig(() => ({ ...config, [fieldName]: value, [errors]: errors }));
	}

	// Handle form input changes
	function handleFormInputChange(event) {
		event.persist();

		const { name, value } = event.target;

		// Validate the changed field (and set its new value)
		validateFormField(name, value);
	}

	// Add an entry
	function submitForm() {
		// Validate the form
		validateFormField('chords', config.chords);
		validateFormField('showChord', config.showChord);
		validateFormField('initialCountdown', config.initialCountdown);
		validateFormField('timePerChord', config.timePerChord);
		validateFormField('duration', config.duration);

		let errorFound = false;

		// Check if any errors are present
		Object.keys(config.errors).forEach((key) => {
			if (config.errors[key].length) {
				console.log(`Error present: ${config.errors[key]}`);
				errorFound = true;
			}
		});

		if (!errorFound) {
			// Update the Redux store
			dispatch(setConfig({
				chord:				config.chords,
				showChord:			config.showChord,
				something:			7,
				initialCountdown:	config.initialCountdown,
				timePerChord:		config.timePerChord,
				duration:			config.duration,
			}));

			// Move the user to the countdown page
			history.push('/CountdownPage');
		}
	}

	return (
		<div className="wrapper">
			<div className="form-wrapper">

				<h2>Guitar thing</h2>

				<div className="chords">
					<label htmlFor="chords">
						Chords
						<select name="chords" onChange={handleFormInputChange}>
							<option value="-1">Please select...</option>
							<option>Basic</option>
							<option>Advanced</option>
							<option>Expert</option>
						</select>
					</label>
					{config.errors.chords.length > 0 && <span className="error">{config.errors.chords}</span>}
				</div>

				<div className="showChord">
					<label htmlFor="showChord">Show chord
						<select name="showChord" onChange={handleFormInputChange}>
							<option value="-1">Please select...</option>
							<option>Yes</option>
							<option>No</option>
						</select>
					</label>
					{config.errors.showChord.length > 0 && <span className="error">{config.errors.showChord}</span>}
				</div>

				<div className="initialCountdown">
					<label htmlFor="initialCountdown">
						Initial countdown (seconds)
						<input name="initialCountdown" type="number" value={config.initialCountdown} onChange={handleFormInputChange} />
					</label>
					{config.errors.initialCountdown.length > 0 && <span className="error">{config.errors.initialCountdown}</span>}
				</div>

				<div className="timePerChord">
					<label htmlFor="timePerChord">
						Time per chord (seconds)
						<input name="timePerChord" type="number" value={config.timePerChord} onChange={handleFormInputChange} />
					</label>
					{config.errors.timePerChord.length > 0 && <span className="error">{config.errors.timePerChord}</span>}
				</div>

				<div className="duration">
					<label htmlFor="duration">
						Duration (minutes)
						<input name="duration" type="number" value={config.duration} onChange={handleFormInputChange} />
					</label>
					{config.errors.duration.length > 0 && <span className="error">{config.errors.duration}</span>}
				</div>

				<button type="button" onClick={submitForm}>Start</button>
			</div>
		</div>
	);
}

export default HomePage;
