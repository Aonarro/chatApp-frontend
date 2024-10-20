import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessagePanel from '../components/messages/MessagePanel.tsx';
import { ConversationChannelPageStyle } from '../components/styles';
import { useAppDispatch, useAppSelector } from '../hooks/typedReduxHooks.ts';
import { useAuthContext } from '../hooks/useAuthContext.ts';
import { useSocketContext } from '../hooks/useSocketContext.ts';
import { fetchMessagesThunk } from '../store/messages/messagesThunk.ts';

const ConversationChannelPage = () => {
	const { loading } = useAppSelector((state) => state.messages);
	const { user } = useAuthContext();
	const socket = useSocketContext();
	const { id } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchMessagesThunk(+id!));
	}, [id]);

	const sendTypingStatus = () => {
		console.log('You are typing');

		socket.emit('onTyping', { userId: user?.id, conversationId: +id! });
	};

	return (
		<ConversationChannelPageStyle>
			{loading ? <div>Loading...</div> : <MessagePanel sendTypingStatus={sendTypingStatus}></MessagePanel>}
		</ConversationChannelPageStyle>
	);
};

export default ConversationChannelPage;
