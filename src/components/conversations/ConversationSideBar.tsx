import { TbEdit } from 'react-icons/tb'
import { ConversationSideBarStyle } from '../styles'

const ConversationSideBar = () => {
	return (
		<ConversationSideBarStyle>
			<header>
				<h1>Conversation</h1>
				<TbEdit size={40} />
			</header>
		</ConversationSideBarStyle>
	)
}

export default ConversationSideBar
