import React, { Component } from 'react';
import { StartButton } from '../components/StartButton.js';
import Switch  from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { Link } from "react-router-dom"; 
import ReduxTester from '../components/ReduxTester.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease, setConfig, getCount } from '../apples/configSlice.js';

export class HomePage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			chords: '-1',
			showChord: '-1',
			initialCountdown: null,
			timePerChord: null,
			duration: null,
			/*chords: 'Basic',
			showChord: 'Yes',
			initialCountdown: 3,
			timePerChord: 2,
			duration: 1,*/
			errors: {
				chords: '',
				showChord: '',
				initialCountdown: '',
				timePerChord: '',
				duration: '',
			},
		}
	}

	// Validate a form field
	validateFormField = (fieldName, value) => {

		let errors = this.state.errors;

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
		this.setState({
			[fieldName]: value,
			errors,
		})

		// Return based on whether an error occurred or not (functionality not yet used)
		return errors[fieldName].length ? false : true;
	}
	

	// Handle form input changes
	handleFormInputChange = (event) => {
		let {name, value} = event.target;

		// Validate the changed field
		this.validateFormField(name, value);
	}

	// Add an entry
	submitForm = () => {

		// Validate the form
		this.validateFormField('chords', this.state.chords);
		this.validateFormField('showChord', this.state.showChord);
		this.validateFormField('initialCountdown', this.state.initialCountdown);
		this.validateFormField('timePerChord', this.state.timePerChord);
		this.validateFormField('duration', this.state.duration);

		// Check if any errors are present
		for(let prop in this.state.errors)
		{
			if(this.state.errors[prop].length) {
				console.log(`Error present: ${prop}`);
				return;
			}
		}

		this.props.history.push({
			pathname: '/CountdownPage',
			data: this.state,
		});
		
	}

	render() {
		const {errors} = this.state;

		return (
			<div className="wrapper">
				<div className="form-wrapper">

					<ReduxTester />

					<h2>Guitar thing</h2>

					<div className='chords'>
						<label htmlFor='chords'>Chords</label>
						<select name='chords' onChange={this.handleFormInputChange}>
							<option value='-1'>Please select...</option>
							<option>Basic</option>
							<option>Advanced</option>
							<option>Expert</option>
						</select>
						{errors.chords.length > 0 && <span className='error'>{errors.chords}</span>}
					</div>

					<div className='showChord'>
						<label htmlFor='showChord'>Show chord</label>
						<select name='showChord' onChange={this.handleFormInputChange}>
							<option value='-1'>Please select...</option>
							<option>Yes</option>
							<option>No</option>
						</select>
						{errors.showChord.length > 0 && <span className='error'>{errors.showChord}</span>}
					</div>

					<div className='initialCountdown'>
						<label htmlFor='initialCountdown'>Initial countdown (seconds)</label>
						<input name='initialCountdown' type='number' value='3' onChange={this.handleFormInputChange} />
						{errors.initialCountdown.length > 0 && <span className='error'>{errors.initialCountdown}</span>}
					</div>

					<div className='timePerChord'>
						<label htmlFor='timePerChord'>Time per chord (seconds)</label>
						<input name='timePerChord' type='number' value='2' onChange={this.handleFormInputChange} />
						{errors.timePerChord.length > 0 && <span className='error'>{errors.timePerChord}</span>}
					</div>

					<div className='duration'>
						<label htmlFor='duration'>Duration (minutes)</label>
						<input name='duration' type='number' value={this.props.duration} onChange={this.handleFormInputChange} />
						{errors.duration.length > 0 && <span className='error'>{errors.duration}</span>}
					</div>

					<button onClick={this.submitForm}>Start</button>
				</div>
			</div>
		)
	}
}

export default HomePage
