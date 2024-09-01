import styled from 'styled-components'

export const InputField = styled.input`
	font-family: 'Inter', sans-serif;
	outline: none;
	border: none;
	color: #fff;
	font-size: 18px;
	width: 100%;
	background-color: inherit;
	margin: 4px 0;
`

export const InputContainer = styled.div`
	background-color: #131313;
	padding: 12px 16px;
	border-radius: 10px;
	width: 100%;
`

export const InputLabel = styled.label`
	display: block;
	color: #8f8f8f;
	font-size: 14px;
	margin: 4px 0;
`

export const Button = styled.button`
	font-family: 'Inter', sans-serif;
	font-size: 16px;
	border-radius: 10px;
	width: 100%;
	outline: none;
	border: none;
	background-color: #2b09ff;
	color: #fff;
	padding: 25px 0;
	cursor: pointer;
	transition: 250ms background-color, border ease;
	&:active,
	&:focus,
	&:hover {
		background-color: #2807d8;
	}
`

export const PageWrapper = styled.div`
	background-color: #1a1a1a;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
