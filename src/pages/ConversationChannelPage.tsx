import { ConversationChannelPageStyle } from '../components/styles';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getConversationMessages } from '../axios/api.ts';
import { Message, MessageEventPayload } from '../utils/types.ts';
import MessagePanel from '../components/messages/MessagePanel.tsx';
import { useSocketContext } from '../hooks/useSocketContext.ts';
import { useAuthContext } from '../hooks/useAuthContext.ts';


const ConversationChannelPage = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const {user} = useAuthContext()
	const socket = useSocketContext();
	const { id } = useParams();

	useEffect(() => {
		getConversationMessages(+id!)
			.then((res) => {
				setMessages(res.data);
			})
			.catch((err) => console.log(err));

		console.log(user);
	}, [id]);

	useEffect(() => {
		socket.on('connection', () => console.log('connected'));

		socket.on('onMessage', (payload: MessageEventPayload) => {
			// const {conversation, ...messageData} = payload

			setMessages((prevState) => [payload, ...prevState])
			console.log("Message received: ", payload);
		})

		return () => {
			socket.off('connection')
			socket.off('onMessage')
		}
	}, []);


	return (
		<ConversationChannelPageStyle>{
			<MessagePanel messages={messages}></MessagePanel>
		}</ConversationChannelPageStyle>
	);
};

export default ConversationChannelPage;
