import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setConfig } from '../apples/configSlice.js';

export function HomePage (props) {

	// Default state values
	const [config, setLocalConfig] = useState({
		chords: 'Basic',
		showChord: 'Yes',
		initialCountdown: 1,
		timePerChord: 2,
		duration: 10,
		errors: {
			chords: '',
			showChord: '',
			initialCountdown: '',
			timePerChord: '',
			duration: ''
		}
	});

	// Redux
	const dispatch = useDispatch()
	const history = useHistory()

	// Validate a form field
	function validateFormField (fieldName, value) {

		let errors = config.errors;

		// Reset any existing errors
		errors[fieldName] = '';
		
		switch(fieldName) {

			case 'chords':
			case 'showChord': {
				errors[fieldName] = (value === '-1' ? 'Please select an option' : '');
				break;
			}

			case "timePerChord": {
				if(value < 1 || value > 60) {
					errors[fieldName] = 'Please enter between 1 and 60 seconds';
				}
				break;
			}

			case "initialCountdown":
			case "duration": {
				if(value < 1 || value > 60) {
					errors[fieldName] = 'Please enter between 1 and 60 seconds';
				}
				break;
			}

			// Inputs which do not require validation
			case 'duration': {
				break;
			}

			default: {
				console.error(`Unrecognised input found - no validation in place for '${fieldName}'`);
			}
		}

		// Set the input's state
		setLocalConfig(config => ({ ...config, [errors]: errors }));
	}
	

	// Handle form input changes
	function handleFormInputChange(event) {
		event.persist();

		let {name, value} = event.target;

		setLocalConfig(config => ({ ...config, [name]: value }));

		// Validate the changed field
		validateFormField(name, value);
	}

	// Add an entry
	function submitForm(event) {

		// Validate the form
		validateFormField('chords', config.chords);
		validateFormField('showChord', config.showChord);
		validateFormField('initialCountdown', config.initialCountdown);
		validateFormField('timePerChord', config.timePerChord);
		validateFormField('duration', config.duration);

		// Check if any errors are present
		for(let prop in config.errors)
		{
			if(config.errors[prop].length) {
				console.log(`Error present: ${prop}`);
				return;
			}
		}

		// Update the Redux store
		dispatch(setConfig({
			initialCountdown: config.initialCountdown,
			timePerChord: config.timePerChord,
			duration: config.duration,
		}));

		// Move the user to the countdown page
		history.push(`/CountdownPage`)
	}

	return (
		<div className="wrapper">
			<div className="form-wrapper">

				<h2>Guitar thing</h2>

				<div className='chords'>
					<label htmlFor='chords'>Chords</label>
					<select name='chords' onChange={handleFormInputChange}>
						<option value='-1'>Please select...</option>
						<option>Basic</option>
						<option>Advanced</option>
						<option>Expert</option>
					</select>
					{config.errors.chords.length > 0 && <span className='error'>{config.errors.chords}</span>}
				</div>

				<div className='showChord'>
					<label htmlFor='showChord'>Show chord</label>
					<select name='showChord' onChange={handleFormInputChange}>
						<option value='-1'>Please select...</option>
						<option>Yes</option>
						<option>No</option>
					</select>
					{config.errors.showChord.length > 0 && <span className='error'>{config.errors.showChord}</span>}
				</div>

				<div className='initialCountdown'>
					<label htmlFor='initialCountdown'>Initial countdown (seconds)</label>
					<input name='initialCountdown' type='number' value={config.initialCountdown} onChange={handleFormInputChange} />
					{config.errors.initialCountdown.length > 0 && <span className='error'>{config.errors.initialCountdown}</span>}
				</div>

				<div className='timePerChord'>
					<label htmlFor='timePerChord'>Time per chord (seconds)</label>
					<input name='timePerChord' type='number' value={config.timePerChord} onChange={handleFormInputChange} />
					{config.errors.timePerChord.length > 0 && <span className='error'>{config.errors.timePerChord}</span>}
				</div>

				<div className='duration'>
					<label htmlFor='duration'>Duration (minutes)</label>
					<input name='duration' type='number' value={config.duration} onChange={handleFormInputChange} />
					{config.errors.duration.length > 0 && <span className='error'>{config.errors.duration}</span>}
				</div>

				<button onClick={submitForm}>Start</button>
			</div>
		</div>
	);
}

export default HomePage
