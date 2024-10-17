import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessagePanel from '../components/messages/MessagePanel.tsx';
import { ConversationChannelPageStyle } from '../components/styles';
import { useAppDispatch, useAppSelector } from '../hooks/typedReduxHooks.ts';
import { useAuthContext } from '../hooks/useAuthContext.ts';
import { useSocketContext } from '../hooks/useSocketContext.ts';
import { updateConversation } from '../store/conversations/conversationsSlice.ts';
import { addMessage } from '../store/messages/messagesSlice.ts';
import { fetchMessagesThunk } from '../store/messages/messagesThunk.ts';
import { MessageEventPayload } from '../utils/types.ts';

const ConversationChannelPage = () => {
	const { loading } = useAppSelector((state) => state.messages);
	const { user } = useAuthContext();
	const socket = useSocketContext();
	const { id } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchMessagesThunk(+id!));
	}, [id]);

	useEffect(() => {
		socket.on('onMessage', (payload: MessageEventPayload) => {
			console.log('payload', payload);

			dispatch(addMessage(payload));
			dispatch(updateConversation(payload.conversation));
			console.log('Message received: ', payload);
		});

		return () => {
			socket.off('onMessage');
		};
	}, []);

	return (
		<ConversationChannelPageStyle>
			{loading ? <div>Loading...</div> : <MessagePanel></MessagePanel>}
		</ConversationChannelPageStyle>
	);
};

export default ConversationChannelPage;
