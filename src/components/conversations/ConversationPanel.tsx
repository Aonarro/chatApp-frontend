import { ConversationChannelPageStyle } from '../styles'
import { useContext } from 'react';
import { AuthContext } from '../../utils/context/AuthContext.tsx';

const ConversationPanel = () => {
	const {user} = useContext(AuthContext)
	return (
		<ConversationChannelPageStyle>
			{user && user.email}
		</ConversationChannelPageStyle>
	)
}

export default ConversationPanel
