import React, { Dispatch, FC, SetStateAction } from 'react';
import { MessageInputFieldContainer, MessageInputFieldStyle } from '../styles';

type Props = {
	message: string;
	setMessage: Dispatch<SetStateAction<string>>;
	handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
	sendTypingStatus: () => void;
};

const MessageInputField: FC<Props> = ({ message, setMessage, handleSendMessage, sendTypingStatus }) => {
	return (
		<MessageInputFieldContainer>
			<form onSubmit={handleSendMessage}>
				<MessageInputFieldStyle
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Write a message..."
					onKeyDown={(e) => {
						sendTypingStatus();
					}}
				/>
			</form>
		</MessageInputFieldContainer>
	);
};

export default MessageInputField;
