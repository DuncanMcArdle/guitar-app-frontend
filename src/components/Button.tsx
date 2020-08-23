import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	min-width: 100%;
	margin-top: 0.5em;
	margin-bottom: 0.5em;
	border: none;
	background-color: #22223B;
	color: #fefefe;
	padding: .75em;

	:hover {
		background-color: #4A4E69;
		color: #fefefe;
	}
`

interface Props {
	text: string,
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

export const Button: FunctionComponent<Props> = ({text, onClick}) => {
	return (
		<StyledButton onClick={onClick}>
			{text}
		</StyledButton>
	)
}
