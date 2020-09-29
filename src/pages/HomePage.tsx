import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setConfig } from '../redux/configSlice';
import { FormRow } from '../components/FormRow';
import Button from '../components/Button';
import HeaderBar from '../components/HeaderBar';

interface LocalConfig {
	chords: string;
	showChord: string;
	initialCountdown: number;
	timePerChord: number;
	duration: number;
	errors: {
		chords: string;
		showChord: string;
		initialCountdown: string;
		timePerChord: string;
		duration: string;
		[key: string]: string;
	};
}

export function HomePage() {
	// Default state values
	const [config, setLocalConfig] = useState<LocalConfig>({
		chords: '-1',
		showChord: '2',
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
	function validateFormField(fieldName: string, value: string | number) {
		const { errors } = config;

		// Reset any existing errors
		errors[fieldName] = '';

		switch (fieldName) {
			case 'chords':
			case 'showChord': {
				errors[fieldName] = value === '-1' ? 'Please select an option' : '';
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
		setLocalConfig(() => ({ ...config, [fieldName]: value, [errors as any]: errors }));
	}

	// Handle form input changes
	function handleFormInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
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
			dispatch(
				setConfig({
					chords: config.chords,
					showChord: config.showChord,
					initialCountdown: config.initialCountdown,
					timePerChord: config.timePerChord,
					duration: config.duration,
				}),
			);

			// Move the user to the countdown page
			history.push('/CountdownPage');
		}
	}

	return (
		<>
			<HeaderBar name="something" />
			<div className="form__wrapper">
				<h1>Guitar thing</h1>

				<FormRow title="Chords:" error={config.errors.chords}>
					<select name="chords" onChange={handleFormInputChange}>
						<option value="-1">Please select...</option>
						<option>Basic</option>
						<option>Advanced</option>
						<option>Expert</option>
					</select>
				</FormRow>

				<FormRow title="Show chord: (disabled)" error={config.errors.showChord}>
					<select name="showChord" disabled value="No" onChange={handleFormInputChange}>
						<option value="-1">Please select...</option>
						<option>Yes</option>
						<option>No</option>
					</select>
				</FormRow>

				<FormRow title="Initial countdown (seconds)" error={config.errors.initialCountdown}>
					<input name="initialCountdown" type="number" value={config.initialCountdown} onChange={handleFormInputChange} />
				</FormRow>

				<FormRow title="Time per chord (seconds)" error={config.errors.timePerChord}>
					<input name="timePerChord" type="number" value={config.timePerChord} onChange={handleFormInputChange} />
				</FormRow>

				<FormRow title="Duration (minutes)" error={config.errors.duration}>
					<input name="duration" type="number" value={config.duration} onChange={handleFormInputChange} />
				</FormRow>
				<Button onClick={submitForm} text="Start" />
			</div>
		</>
	);
}

export default HomePage;
