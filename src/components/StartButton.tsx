import React, { MouseEventHandler } from 'react';
import './StartButton.css';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

interface Props {
	submitForm: MouseEventHandler,
	text: string,
}

function StartButton({ submitForm, text }: Props) {
	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				onClick={submitForm}
			>
				{text}
			</Button>
		</div>
	);
}

// PropTypes
StartButton.propTypes = {
	submitForm: PropTypes.func.isRequired,
};

export default StartButton;
