import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
	render, fireEvent,
} from '@testing-library/react';
import Button from '../../components/Button.tsx';

describe('Button component', () => {
	const sampleText = 'Sample text';
	let onClick;
	let button;

	beforeEach(() => {
		onClick = jest.fn();
		button = render(<Button text={sampleText} onClick={onClick} />);
	});

	test('Button is rendered with the correct text', () => {
		expect(button.getByText(sampleText)).toBeInTheDocument();
	});

	test('Clicking the button calls the expected function ', () => {
		fireEvent.click(button.getByText(sampleText));
		expect(onClick).toHaveBeenCalled();
	});
});
