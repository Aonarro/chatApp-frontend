import { ConversationChannelPageStyle } from '../components/styles';
import { useParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { getConversationMessages } from '../axios/requests.ts';
import { Message } from '../utils/types.ts';
import MessagePanel from '../components/messages/MessagePanel.tsx';


const ConversationChannelPage = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	const { id } = useParams();
	console.log(messages)

	useEffect(() => {
		getConversationMessages(+id!)
			.then((res) => {
				setMessages(res.data);
			})
			.catch((err) => console.log(err));
	}, [id]);


	return (
		<ConversationChannelPageStyle>{
			<MessagePanel messages={messages}></MessagePanel>
		}</ConversationChannelPageStyle>
	);
};

export default ConversationChannelPage;
