import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
	render, fireEvent,
} from '@testing-library/react';
import FormRow from '../../components/FormRow.tsx';

describe('FormRow component', () => {
	let formRow;
	const sampleTitle = 'Sample text';
	const samplePlaceholder = 'Sample placeholder';
	const sampleError = 'Sample error';

	test('Shows correct title', () => {
		formRow = render(<FormRow title={sampleTitle} />);
		expect(formRow.getByText(sampleTitle)).toBeInTheDocument();
	});

	test('Shows an input', () => {
		formRow = render(<FormRow title={sampleTitle}><input placeholder={samplePlaceholder} /></FormRow>);
		expect(formRow.getByPlaceholderText(samplePlaceholder)).toBeInTheDocument();
	});

	test('Shows error', () => {
		formRow = render(<FormRow title={sampleTitle} error={sampleError} />);
		expect(formRow.getByText(sampleError)).toBeInTheDocument();
	});
});
