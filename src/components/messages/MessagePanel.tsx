import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postMessage } from '../../axios/api.ts';
import { useAppSelector } from '../../hooks/typedReduxHooks.ts';
import { useAuthContext } from '../../hooks/useAuthContext.ts';
import { selectConversationById } from '../../store/conversations/conversationsSlice.ts';
import { getRecipientFromConversation } from '../../utils/helpers.ts';
import { MessagePanelBody, MessagePanelStyle, TypingStatus } from '../styles';
import MessageContainer from './MessageContainer.tsx';
import MessageInputField from './MessageInputField.tsx';
import MessagePanelHeader from './MessagePanelHeader.tsx';

type Props = {
	sendTypingStatus: () => void;
	isRecipientTyping: boolean;
};

const MessagePanel: FC<Props> = ({ sendTypingStatus, isRecipientTyping }) => {
	const [message, setMessage] = useState<string>('');
	const { user } = useAuthContext();
	const { id } = useParams();

	const conversation = useAppSelector((state) => selectConversationById(state, +id!));
	const recipient = getRecipientFromConversation(conversation, user);

	console.log(isRecipientTyping);

	const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!id || !message) return;
		try {
			console.log('Message send', message);
			await postMessage(+id, { content: message });
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
				<TypingStatus>{isRecipientTyping ? `${recipient?.firstName} is typing...` : ''}</TypingStatus>
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
