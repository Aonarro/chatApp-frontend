import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import { useAuthContext } from '../../hooks/useAuthContext';
import { RootState } from '../../store';
import { selectConversationById } from '../../store/conversations/conversationsSlice';
import { MessagePanelHeaderStyle } from '../styles';

const MessagePanelHeader = () => {
	const { id } = useParams();
	const { user } = useAuthContext();

	const conversation = useAppSelector((state: RootState) => selectConversationById(state, +id!));

	const displayName =
		user?.id === conversation?.creator.id
			? `${conversation?.recipient.firstName} ${conversation?.recipient.lastName}`
			: `${conversation?.creator.email} ${conversation?.creator.lastName}`;

	return <MessagePanelHeaderStyle>{displayName}</MessagePanelHeaderStyle>;
};

export default MessagePanelHeader;
