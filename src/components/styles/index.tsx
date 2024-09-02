import styled from 'styled-components'
import { PageWrapperProps } from './StyleTypes'

//Constants
export const SIDEBAR_WIDTH = 400

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

export const PageWrapper = styled.div<PageWrapperProps>`
	background-color: #1a1a1a;
	height: 100%;
	display: ${props => props.display};
	justify-content: ${props => props.justifyContent};
	align-items: ${props => props.alignItems};
`

export const ConversationSideBarStyle = styled.aside`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: ${SIDEBAR_WIDTH}px;
	background-color: #1a1a1a;
	border-right: 1px solid #54545476;
	& header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 24px;
		background-color: #151515;
		height: 100px;
		border-bottom: 1px solid #54545476;
		& h1 {
			font-weight: 400;
		}
	}
`

export const ConversationChannelPageStyle = styled.div`
	height: 100%;
	margin-left: ${SIDEBAR_WIDTH}px;
`
