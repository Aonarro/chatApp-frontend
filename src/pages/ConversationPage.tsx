import { Outlet, useParams } from 'react-router-dom';
import ConversationPanel from '../components/conversations/ConversationPanel';
import ConversationSideBar from '../components/conversations/ConversationSideBar';
import { PageWrapper } from '../components/styles';
import { useEffect } from 'react';
import { fetchConversationsThunk } from '../store/conversationsSlice.ts';
import { useAppDispatch } from '../hooks/typedReduxHooks.ts';

const ConversationPage = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log('first fetch');
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
