import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ConversationPanel from '../components/conversations/ConversationPanel';
import ConversationSideBar from '../components/conversations/ConversationSideBar';
import { PageWrapper } from '../components/styles';
import { useAppDispatch } from '../hooks/typedReduxHooks.ts';
import { useSocketContext } from '../hooks/useSocketContext.ts';
import { addConversation, updateConversation } from '../store/conversations/conversationsSlice.ts';
import { fetchConversationsThunk } from '../store/conversations/conversationsThunk.ts';
import { addMessage } from '../store/messages/messagesSlice.ts';
import { Conversation, MessageEventPayload } from '../utils/types.ts';

const ConversationPage = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const socket = useSocketContext();

	useEffect(() => {
		dispatch(fetchConversationsThunk());
	}, []);

	useEffect(() => {
		socket.connect();
		socket.emit('onClientConnect', { conversationId: +id! });
		socket.on('connect', () => {
			console.log('Connected to socket');
		});
		socket.on('Connected to the chat', (data) => {
			console.log(data);
		});

		socket.on('onMessage', (payload: MessageEventPayload) => {
			dispatch(addMessage(payload));
			dispatch(updateConversation(payload.conversation));
			console.log('Message received: ', payload);
		});
		socket.on('onNewConversation', (payload: Conversation) => {
			console.log(payload);
			dispatch(addConversation(payload));
		});
		return () => {
			socket.off('connect');
			socket.disconnect();
			socket.off('Connected to the chat');
			socket.off('onMessage');
			socket.off('onNewConversation');
		};
	}, []);

	return (
		<PageWrapper>
			<ConversationSideBar />
			{!id && <ConversationPanel />}
			<Outlet />
		</PageWrapper>
	);
};

export default ConversationPage;
