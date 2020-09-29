import styled from 'styled-components';
import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const StyledHeaderBar = styled.div`
	height: 2em;
	float: left;
	position: absolute;
	border-bottom: solid 1px black;
	background-color: grey;
	top: 0;
	left: 0;
	width: 100%;

	* {
		float: left;
		display: inline-block;
	}
`;

interface Props {
	name: string;
}

export default function HeaderBar({ name }: Props): ReactElement {
	// Load the authentication state from the Redux store
	const auth = useSelector((state: RootState) => state.auth);

	// Credential inputs
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPassword, setInputPassword] = useState<string>('');

	function login() {
		console.log('called login');

		axios
			.post('http://127.0.0.1:3001/api/user/login', {
				email: inputEmail,
				password: inputPassword,
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<StyledHeaderBar>
			<input type="text" placeholder="Email" value={inputEmail} />
			<input type="password" placeholder="Password" value={inputPassword} />
			<button onClick={login} type="submit">
				Login
			</button>
			<button type="submit">Logout</button>
			<select>
				<option>Chord sets</option>
			</select>
			<p>Status: Logged {auth.loggedIn ? 'in' : 'out'}</p>
			{name}
		</StyledHeaderBar>
	);
}
