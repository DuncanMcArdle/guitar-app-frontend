import React from 'react'
import CountdownTimer from '../components/CountdownTimer';
import { useHistory } from "react-router-dom";

import { useSelector } from 'react-redux';

export function CountdownPage(props) {

	const history = useHistory()

	// Load the config from the Redux store
	const config = useSelector((state) => state.config)

	function goBack () {
		history.push(`/`)
	}

	function countdownCompleted () {
		history.push(`/ChordPage`)
	}

	return (
		<div className="wrapper">
			<div className="form-wrapper">

				<h2>Get ready!</h2>

				<h1 className='countdownTimer'>
					<CountdownTimer
						startingTime={parseInt(config.initialCountdown)}
						onComplete={countdownCompleted}
						formatNumber={false}
						/>
				</h1>

				<button
					onClick={goBack}
					>Go back</button>
			</div>
		</div>
	)
}

export default CountdownPage
