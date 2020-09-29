import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	min-width: 100%;
	margin-top: 0.5em;
	margin-bottom: 0.5em;
	border: none;
	background-color: #22223b;
	color: #fefefe;
	padding: 0.75em;

	:hover {
		background-color: #4a4e69;
		color: #fefefe;
	}
`;

interface Props {
	text: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FunctionComponent<Props> = ({ text, onClick }) => <StyledButton onClick={onClick}>{text}</StyledButton>;

export default Button;
