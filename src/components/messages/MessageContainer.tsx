import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/typedReduxHooks.ts';
import { useAuthContext } from '../../hooks/useAuthContext.ts';
import { selectConversationMessage } from '../../store/messages/messagesSlice.ts';
import { formatDate } from '../../utils/helpers.ts';
import { Message, User } from '../../utils/types.ts';
import {
	MessageContainerStyle,
	MessageItemAvatar,
	MessageItemContainerStyle,
	MessageItemContent,
	MessageItemDetails,
	MessageItemHeader,
} from '../styles';

type formattedMessageProps = {
	user: User | undefined;
	message: Message;
	isAuthor: boolean;
};

export const FormattedMessage: FC<formattedMessageProps> = ({ user, message, isAuthor }) => {
	return (
		<MessageItemContainerStyle key={message.id} $isAuthor={isAuthor}>
			<MessageItemAvatar />
			<MessageItemDetails>
				<MessageItemHeader>
					<span
						className="authorName"
						style={{
							color: user?.id === message.author.id ? '#2464c5' : 'rgba(133,21,49,0.68)',
						}}
					>
						{message.author.firstName} {message.author.lastName}
					</span>

					<span className="time">{formatDate(message.createdAt)}</span>
				</MessageItemHeader>
				<MessageItemContent>{message.content}</MessageItemContent>
			</MessageItemDetails>
		</MessageItemContainerStyle>
	);
};

const MessageContainer: FC = () => {
	const { id } = useParams();
	const { user } = useAuthContext();
	const conversationMessages = useAppSelector((state) => selectConversationMessage(state, +id!));

	console.log(conversationMessages, id);

	const formatMessages = () => {
		return conversationMessages?.messages.map((el, idx, arr) => {
			const currentMessage = arr[idx];
			const nextMessage = arr[idx + 1];

			const isAuthor = el.author.id === user?.id;

			if (arr.length === idx + 1) {
				return <FormattedMessage user={user} message={el} isAuthor={isAuthor} key={el.id} />;
			}

			if (currentMessage.author.id === nextMessage.author.id) {
				return (
					<MessageItemContainerStyle key={el.id} $isAuthor={isAuthor}>
						<MessageItemContent $padding="0 0 0 70px">{el.content}</MessageItemContent>
					</MessageItemContainerStyle>
				);
			} else {
				return <FormattedMessage user={user} message={el} isAuthor={isAuthor} key={el.id} />;
			}
		});
	};

	useEffect(() => {
		formatMessages();
		console.log(conversationMessages);
	});

	return <MessageContainerStyle>{formatMessages()}</MessageContainerStyle>;
};

export default MessageContainer;
