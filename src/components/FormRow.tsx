import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface Props {
	title:string,
	error?:string,
}

const Label = styled.div`
  width: 50%;
  float: left;
  margin-top: 1em;
  margin-bottom: 1em;
  text-align: left;
`

const Input = styled.div`
  width: 50%;
  float: right;
  margin-top: 1em;
  margin-bottom: 1em;

  input, select {
	  width: 100%;
  }
`

const Error = styled.div`
	float: left;  
	width: 100%;
  	color: red;
  	font-weight: bold;

  	:before {
	  content: '* ';
	}
`

export const FormRow: FunctionComponent<Props> = ({title, error, children}) => {
	return (
		<div>
			<Label>{title}</Label>
			<Input>{children}</Input>
			{error && <Error>{error}</Error>}
		</div>
	)
}

export default FormRow;