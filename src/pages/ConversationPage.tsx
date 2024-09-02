import { Outlet, useParams } from 'react-router-dom'
import ConversationPanel from '../components/conversations/ConversationPanel'
import ConversationSideBar from '../components/conversations/ConversationSideBar'
import { PageWrapper } from '../components/styles'

const ConversationPage = () => {
	const { id } = useParams()
	return (
		<PageWrapper>
			<ConversationSideBar />
			{!id && <ConversationPanel />}
			<Outlet />
		</PageWrapper>
	)
}

export default ConversationPage
