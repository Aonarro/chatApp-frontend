import { MessageInputFieldContainer, MessageInputFieldStyle } from '../styles';
import React, { Dispatch, FC, SetStateAction } from 'react';

type Props = {
	message: string
	setMessage: Dispatch<SetStateAction<string>>
	handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}

const MessageInputField: FC<Props> = ({ message, setMessage, handleSendMessage }) => {
	return (
		<MessageInputFieldContainer>
			<form onSubmit={handleSendMessage}>
				<MessageInputFieldStyle value={message} onChange={(e) => setMessage(e.target.value)}
																placeholder="Write a message..." />
			</form>

		</MessageInputFieldContainer>
	);
};

export default MessageInputField;