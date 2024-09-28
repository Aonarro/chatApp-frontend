import {
	MessageContainerStyle,
	MessageItemAvatar,
	MessageItemContainerStyle, MessageItemContent,
	MessageItemDetails,
	MessageItemHeader,
} from '../styles';
import { FC, useEffect } from 'react';
import { Message, User } from '../../utils/types.ts';
import { formatDate } from '../../utils/helpers.ts';
import { useAuthContext } from '../../hooks/useAuthContext.ts';

type Props = {
	messages: Message[]
}

type formattedMessageProps = {
	user: User | undefined
	message: Message
	isAuthor: boolean
}

export const FormattedMessage: FC<formattedMessageProps> = ({ user, message, isAuthor }) => {
	return (
		<MessageItemContainerStyle key={message.id} $isAuthor={isAuthor}>
			<MessageItemAvatar />
			<MessageItemDetails>
				<MessageItemHeader>
							<span className="authorName" style={{
								color: user?.id === message.author.id ? '#2464c5' : 'rgba(133,21,49,0.68)',
							}}>
								{message.author.firstName} {message.author.lastName}
							</span>

					<span className="time">
								{formatDate(message.createdAt)}
							</span>
				</MessageItemHeader>
				<MessageItemContent>
					{message.content}
				</MessageItemContent>
			</MessageItemDetails>
		</MessageItemContainerStyle>
	);
};

const MessageContainer: FC<Props> = ({ messages }) => {

	const { user } = useAuthContext();

	const formatMessages = () => {
		return messages.map((el, idx, arr) => {
			const currentMessage = arr[idx];
			const nextMessage = arr[idx + 1];

			const isAuthor = el.author.id === user?.id;

			console.log(`${el.author.email}, ${el.id}`, isAuthor);


			if (arr.length === idx + 1) {
				return <FormattedMessage user={user} message={el} isAuthor={isAuthor} key={el.id}/>;
			}

			if (currentMessage.author.id === nextMessage.author.id) {
				return (
					<MessageItemContainerStyle key={el.id} $isAuthor={isAuthor}>
						<MessageItemContent $padding="0 0 0 70px">
							{el.content}
						</MessageItemContent>

					</MessageItemContainerStyle>
				);
			} else {
				return <FormattedMessage user={user} message={el} isAuthor={isAuthor} key={el.id}/>;
			}
		});

	};


	useEffect(() => {
		formatMessages();
	});


	return (
		<MessageContainerStyle>
			{formatMessages()}
		</MessageContainerStyle>

	);

};

export default MessageContainer;
