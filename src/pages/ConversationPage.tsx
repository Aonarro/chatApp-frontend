import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import ConversationPanel from '../components/conversations/ConversationPanel';
import ConversationSideBar from '../components/conversations/ConversationSideBar';
import { PageWrapper } from '../components/styles';
import { useAppDispatch } from '../hooks/typedReduxHooks.ts';
import { useSocketContext } from '../hooks/useSocketContext.ts';
import { fetchConversationsThunk } from '../store/conversations/conversationsThunk.ts';

const ConversationPage = () => {
	const { id } = useParams();
	const socket = useSocketContext();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchConversationsThunk());
		socket.connect();
		socket.on('connect', () => console.log('connected to socket'));
		socket.on('disconnect', () => {
			console.log('disconnected from socket');
			socket.connect();
		});
		socket.on('connect_error', (error) => {
			if (error.message === 'Unauthorized') {
				console.log('Unauthorized, closing socket...');
				socket.disconnect(); // Закрываем сокет при 403 ошибке
				navigate('/login'); // Перенаправляем на страницу логина
			} else {
				console.log('Connection error:', error.message);
			}
		});

		return () => {
			socket.off('connect');
			socket.off('connect_error');
			socket.off('disconnect');
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
