import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/typedReduxHooks.ts';
import { useAuthContext } from '../../hooks/useAuthContext.ts';
import { selectConversationMessage } from '../../store/messages/messagesSlice.ts';
import { MenuContext } from '../../utils/context/MenuContext.tsx';
import { formatDate } from '../../utils/helpers.ts';
import { Message, User } from '../../utils/types.ts';
import SelectedMessageContextMenu from '../menus/SelectedMessageContextMenu.tsx';
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
	onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const FormattedMessage: FC<formattedMessageProps> = ({ user, message, isAuthor, onContextMenu }) => {
	return (
		<MessageItemContainerStyle onContextMenu={onContextMenu} key={message.id} $isAuthor={isAuthor}>
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
	const [showMenu, setShowMenu] = useState(false);
	const [messagePoints, setMessagePoints] = useState({ x: 0, y: 0 });
	const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
	const conversationMessages = useAppSelector((state) => selectConversationMessage(state, +id!));

	const onContextMenu = (e: React.MouseEvent<HTMLDivElement>, message: Message) => {
		e.preventDefault();
		setShowMenu(true);
		setMessagePoints({ x: e.pageX, y: e.pageY });
		setSelectedMessage(message);
	};

	useEffect(() => {
		const handleClick = () => setShowMenu(false);

		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, []);

	console.log(messagePoints);

	const formatMessages = () => {
		return conversationMessages?.messages.map((el, idx, arr) => {
			const currentMessage = arr[idx];
			const nextMessage = arr[idx + 1];

			const isAuthor = el.author.id === user?.id;

			if (arr.length === idx + 1) {
				return (
					<FormattedMessage
						onContextMenu={(e) => onContextMenu(e, el)}
						user={user}
						message={el}
						isAuthor={isAuthor}
						key={el.id}
					/>
				);
			}

			if (currentMessage.author.id === nextMessage.author.id) {
				return (
					<MessageItemContainerStyle key={el.id} $isAuthor={isAuthor} onContextMenu={(e) => onContextMenu(e, el)}>
						<MessageItemContent $padding="0 0 0 70px">{el.content}</MessageItemContent>
					</MessageItemContainerStyle>
				);
			} else {
				return (
					<FormattedMessage
						onContextMenu={(e) => onContextMenu(e, el)}
						user={user}
						message={el}
						isAuthor={isAuthor}
						key={el.id}
					/>
				);
			}
		});
	};

	useEffect(() => {
		formatMessages();
	});

	return (
		<MenuContext.Provider
			value={{
				message: selectedMessage,
				setMessage: setSelectedMessage,
			}}
		>
			<MessageContainerStyle>
				{formatMessages()}
				{showMenu && <SelectedMessageContextMenu messagePoints={messagePoints} />}
			</MessageContainerStyle>
		</MenuContext.Provider>
	);
};

export default MessageContainer;
