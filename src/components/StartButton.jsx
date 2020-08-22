import React from 'react';
import './StartButton.css';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

function StartButton(props) {
	const { submitForm, text } = props;

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
