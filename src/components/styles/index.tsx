import styled from 'styled-components'
import { InputContainerProps, MessageItemContentProps, MessageItemProps, PageWrapperProps } from './StyleTypes';

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

export const InputContainer = styled.div<InputContainerProps>`
	background-color: ${props => props.$backgroundColor || '#131313'};
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
	display: ${props => props.$display};
	justify-content: ${props => props.$justifyContent};
	align-items: ${props => props.$alignItems};
`

export const ConversationSideBarStyle = styled.aside`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: ${SIDEBAR_WIDTH}px;
	background-color: #1a1a1a;
	border-right: 1px solid #54545476;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`

export const ConversationSidebarHeader = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: ${SIDEBAR_WIDTH}px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 22px;
	background-color: #151515;
	height: 100px;
	border-bottom: 1px solid #54545476;
	& h1 {
		font-weight: 400;
	}
`

export const ConversationChannelPageStyle = styled.div`
	height: 100%;
	margin-left: ${SIDEBAR_WIDTH}px;
`

export const ConversationSidebarItem = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	padding: 18px 24px;
	border-bottom: 1px solid #54545476;
	background-color: #131313;
`

export const ConversationSidebarContainer = styled.div`
margin-top: 100px`

export const ModalOverlay = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.65);
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99;
`

export const ModalHeaderStyle = styled.header`
    margin-top: 24px;
		padding: 0 18px;
    background-color: #121212;
    width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		& h2 {
				font-weight: 500;
	
		}
`

export const ModalContainerStyle = styled.div`
    background-color: #121212;
		width: 650px;
		border-radius: 10px;
`

export const ModalContentBodyStyle = styled.div`
	padding: 24px;
`

export const TextArea = styled.textarea`
    font-family: 'Inter', sans-serif;
    outline: none;
    border: none;
    color: #fff;
    font-size: 18px;
    width: 100%;
    background-color: inherit;
    margin: 4px 0;
		resize: none;
		overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`



export const MessageContainerStyle = styled.div`
    height: 100%;
		padding: 10px 0;
		display: flex;
		//justify-content: flex-end;
		flex-direction: column-reverse;
		overflow-y: auto;
		
		&::-webkit-scrollbar {
        display: none;
		}


`

export const MessageInputFieldContainer = styled.div`
    background-color: #101010;
    border-radius: 5px;
    width: 100%;
		padding: 12px 16px;
		
		form {
				width: 100%;
		}
`

export const MessageInputFieldStyle = styled.input`
    background-color: inherit;
    outline: none;
    border: none;
    color: #454545;
    font-size: 18px;
    width: 100%;
    padding: 0;
    margin: 4px 0;
`

export const MessageItemContainerStyle = styled.div<MessageItemProps>`
    display: flex;
		gap: 20px;
		justify-content: ${(props) => {
			return props.$isAuthor ? 'flex-end' : 'flex-start'
		}};
		align-items: center;
		padding: 5px 0;
		margin-top: 15px;
`

export const MessageItemAvatar = styled.div`
    width: 50px;
    height: 50px;
		background-color: #fff;
		border-radius: 50px;
`

export const MessageItemDetails = styled.div`

`

export const MessageItemHeader = styled.div`
    display: flex;
    gap: 12px;
		align-items: center;
		
		.authorName {
				font-weight: 600;
        font-size: 16px;
		}
		
		.time {
				color: #6d6d6d;
        font-size: 14px;
        font-weight: 500;
		}
`

export const MessageItemContent = styled.div<MessageItemContentProps>`
	padding: ${props => props.$padding};
`

export const MessagePanelStyle = styled.div`
		display: flex;
		flex-direction: column;
		background-color: inherit;
		height: 100%;
		position: relative;
		
`


export const MessagePanelBody = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 100px 32px 32px 32px;
`

export const MessagePanelHeaderStyle = styled.header`
    background-color: #151515;
    border-bottom: 1px solid #5454543d;
    border-left: 1px solid #5454543d;
		height: 100px;
		display: flex;
		justify-content: space-between;
    align-items: center;
		padding: 0 32px;
		position: absolute;
    width: 100%;
`


