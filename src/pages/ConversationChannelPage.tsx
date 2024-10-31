import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessagePanel from '../components/messages/MessagePanel.tsx';
import { ConversationChannelPageStyle } from '../components/styles';
import { useAppDispatch, useAppSelector } from '../hooks/typedReduxHooks.ts';
import { useSocketContext } from '../hooks/useSocketContext.ts';
import { fetchMessagesThunk } from '../store/messages/messagesThunk.ts';

const ConversationChannelPage = () => {
	const { loading } = useAppSelector((state) => state.messages);
	const socket = useSocketContext();
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
	const [isTyping, setIsTyping] = useState<boolean>(false);
	const [isRecipientTyping, setIsRecipientTyping] = useState<boolean>(false);

	useEffect(() => {
		dispatch(fetchMessagesThunk(+id!));
	}, [id]);

	useEffect(() => {
		socket.emit('onConversationJoin', { conversationId: +id! });

		socket.on('userJoin', () => {
			console.log('userJoin');
		});
		socket.on('userLeave', () => {
			console.log('userLeave');
		});

		socket.on('onTypingStart', () => {
			console.log('onTypingStart: User has started typing...');
			setIsRecipientTyping(true);
		});
		socket.on('onTypingStop', () => {
			console.log('onTypingStop: User has stopped typing...');
			setIsRecipientTyping(false);
		});

		return () => {
			socket.emit('onConversationLeave', { conversationId: +id! });
			socket.off('userJoin');
			socket.off('userLeave');
			socket.off('onTypingStart');
			socket.off('onTypingStop');
		};
	}, [id, socket]);

	const sendTypingStatus = () => {
		if (isTyping) {
			clearTimeout(timer);
			setTimer(
				setTimeout(() => {
					console.log('User stopped typing');
					socket.emit('onTypingStop', { conversationId: +id! });
					setIsTyping(false);
				}, 2000)
			);
		} else {
			setIsTyping(true);
			socket.emit('onTypingStart', { conversationId: +id! });
		}
	};

	return (
		<ConversationChannelPageStyle>
			{loading ? (
				<div>Loading...</div>
			) : (
				<MessagePanel isRecipientTyping={isRecipientTyping} sendTypingStatus={sendTypingStatus}></MessagePanel>
			)}
		</ConversationChannelPageStyle>
	);
};

export default ConversationChannelPage;
