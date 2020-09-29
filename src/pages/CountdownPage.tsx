import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CountdownTimer } from '../components/CountdownTimer';
import { RootState } from '../redux/store';
import Button from '../components/Button';

export function CountdownPage() {
	const history = useHistory();

	// Load the config from the Redux store
	const config = useSelector((state: RootState) => state.config);

	function goBack() {
		history.push('/');
	}

	function countdownCompleted() {
		history.push('/ChordPage');
	}

	return (
		<div className="form__wrapper">
			<h1>Get ready!</h1>

			<h2 className="countdownTimer">
				Starting in <CountdownTimer
					startingTime={Number(config.initialCountdown)}
					onComplete={countdownCompleted}
					formatNumber={false}
				/> seconds
			</h2>

			<Button onClick={goBack} text="Go back" />
		</div>
	);
}

export default CountdownPage;
