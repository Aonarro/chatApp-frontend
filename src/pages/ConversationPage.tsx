import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ConversationPanel from '../components/conversations/ConversationPanel';
import ConversationSideBar from '../components/conversations/ConversationSideBar';
import { PageWrapper } from '../components/styles';
import { useAppDispatch } from '../hooks/typedReduxHooks.ts';
import { fetchConversationsThunk } from '../store/conversations/conversationsThunk.ts';

const ConversationPage = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchConversationsThunk());
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
