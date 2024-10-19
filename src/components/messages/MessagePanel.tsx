import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postMessage } from '../../axios/api.ts';
import { MessagePanelBody, MessagePanelStyle } from '../styles';
import MessageContainer from './MessageContainer.tsx';
import MessageInputField from './MessageInputField.tsx';
import MessagePanelHeader from './MessagePanelHeader.tsx';

type Props = {
	sendTypingStatus: () => void;
};

const MessagePanel: FC<Props> = ({ sendTypingStatus }) => {
	const [message, setMessage] = useState('');
	const { id } = useParams();

	const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!id || !message) return;
		try {
			console.log('Message send', message);
			await postMessage({ content: message, conversationId: +id });
			setMessage('');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<MessagePanelStyle>
			<MessagePanelHeader />

			<MessagePanelBody>
				<MessageContainer />
				{/* {<div>Is Typing...</div>} */}
				<MessageInputField
					sendTypingStatus={sendTypingStatus}
					message={message}
					setMessage={setMessage}
					handleSendMessage={handleSendMessage}
				/>
			</MessagePanelBody>
		</MessagePanelStyle>
	);
};

export default MessagePanel;
