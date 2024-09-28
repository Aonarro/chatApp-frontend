import { Outlet, useParams } from 'react-router-dom';
// import mockConversation from '../__mocks__/conversations'
import ConversationPanel from '../components/conversations/ConversationPanel';
import ConversationSideBar from '../components/conversations/ConversationSideBar';
import { PageWrapper } from '../components/styles';
import { useEffect, useState } from 'react';
import { getConversations } from '../axios/api.ts';
import { Conversation } from '../utils/types.ts';

const ConversationPage = () => {
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const { id } = useParams();

	const getAllConversations = async () => {
		try {
			const result = await getConversations();
			setConversations(result.data);
		} catch (err) {
			console.log(err);
		}

	};



	useEffect(() => {
		getAllConversations();

	}, []);

	return (
		<PageWrapper>
			<ConversationSideBar conversations={conversations} />
			{!id && <ConversationPanel />}
			<Outlet />
		</PageWrapper>
	);
};

export default ConversationPage;
