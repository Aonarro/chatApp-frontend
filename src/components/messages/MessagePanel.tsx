import { MessagePanelBody, MessagePanelStyle } from '../styles';
import MessageContainer from './MessageContainer.tsx';
import MessageInputField from './MessageInputField.tsx';
import React, { FC, useState } from 'react';
import { Message } from '../../utils/types.ts';
import MessagePanelHeader from './MessagePanelHeader.tsx';
import { useParams } from 'react-router-dom';
import { postMessage } from '../../axios/api.ts';

type Props = {
	messages: Message[]
}

const MessagePanel: FC<Props> = ({ messages }) => {
	const [message, setMessage] = useState('')
	const { id } = useParams();


	const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault()
		if (!id || !message) return
		try {
			console.log('Message send', message);
			await postMessage({content: message, conversationId: +id})
			setMessage('')
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<MessagePanelStyle>
			<MessagePanelHeader />

			<MessagePanelBody>
				<MessageContainer messages={messages} />
				<MessageInputField message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
			</MessagePanelBody>

		</MessagePanelStyle>
	);
};

export default MessagePanel;