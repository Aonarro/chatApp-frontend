import { useContext } from 'react';
import { AuthContext } from '../../utils/context/AuthContext.tsx';
import { ConversationChannelPageStyle } from '../styles';

const ConversationPanel = () => {
	const { user } = useContext(AuthContext);
	return (
		<ConversationChannelPageStyle>
			{user && user.email} {user && user.id}
		</ConversationChannelPageStyle>
	);
};

export default ConversationPanel;
