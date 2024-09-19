import { Outlet, useParams } from 'react-router-dom';
// import mockConversation from '../__mocks__/conversations'
import ConversationPanel from '../components/conversations/ConversationPanel';
import ConversationSideBar from '../components/conversations/ConversationSideBar';
import { PageWrapper } from '../components/styles';

const ConversationPage = () => {
	const { id } = useParams();
	console.log(id);
	return (
		<PageWrapper>
			<ConversationSideBar conversations={[]} />
			{!id && <ConversationPanel />}
			<Outlet />
		</PageWrapper>
	);
};

export default ConversationPage;
