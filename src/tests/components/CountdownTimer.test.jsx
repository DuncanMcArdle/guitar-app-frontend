import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { CountdownTimer } from '../../components/CountdownTimer.tsx';

describe('Button component', () => {
	const onComplete = jest.fn();
	let countdownTimer;

	test('Format time function formats time correctly', () => {
		countdownTimer = render(<CountdownTimer startingTime="120" onComplete={onComplete} formatNumber />);
		expect(countdownTimer.getByText('2 minutes')).toBeInTheDocument();
	});

	test('Countdown timer calls the oncomplete function within the specified time', async () => {
		countdownTimer = render(<CountdownTimer startingTime="1" onComplete={onComplete} formatNumber />);
		await waitFor(() => expect(onComplete).toHaveBeenCalled());
	});
});
