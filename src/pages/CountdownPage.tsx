import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CountdownTimer } from '../components/CountdownTimer';
import { RootState } from '../redux/store';

export function CountdownPage() {
	const history = useHistory();

	// Load the config from the Redux store
	const config = useSelector((state:RootState) => state.config);

	function goBack() {
		history.push('/');
	}

	function countdownCompleted() {
		history.push('/ChordPage');
	}

	return (
		<div className="wrapper">
			<div className="form-wrapper">

				<h2>Get ready!</h2>

				<h1 className="countdownTimer">
					<CountdownTimer
						startingTime={Number(config.initialCountdown)}
						onComplete={countdownCompleted}
						formatNumber={false}
					/>
				</h1>

				<button
					type="button"
					onClick={goBack}
				>
					Go back
				</button>
			</div>
		</div>
	);
}

export default CountdownPage;
