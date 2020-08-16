import React, { Component } from 'react'
import CountdownTimer from '../components/CountdownTimer';
import ReduxTester from '../components/ReduxTester';

export class CountdownPage extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			currentTime: props.location.data.initialCountdown,
			dataInput: props.location.data,
		};

		console.log('CountdownPage input data:');
		console.log(this.state.dataInput);
	}

	goBack = () => {
		this.props.history.goBack();
	}

	countdownTicked = () => {
	}

	countdownCompleted = () => {

		this.props.history.push({
			pathname: '/ChordPage',
			data: this.state.dataInput,
		});
	}

	render() {
		return (
			<div className="wrapper">
				<div className="form-wrapper">

					<ReduxTester />

					<h2>Get ready!</h2>

					<h1 className='countdownTimer'>
						<CountdownTimer
							startingTime={parseInt(this.state.dataInput.initialCountdown)}
							onComplete={this.countdownCompleted}
							onTick={this.countdownTicked}
							/>
					</h1>

					<button
						onClick={this.goBack}
						>Go back</button>
				</div>
			</div>
		)
	}
}

export default CountdownPage
