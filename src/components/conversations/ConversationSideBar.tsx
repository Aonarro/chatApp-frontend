import { FC } from 'react'
import { TbEdit } from 'react-icons/tb'
import { ConversationType } from '../../utils/types'
import {
	ConversationSidebarContainer,
	ConversationSidebarHeader,
	ConversationSidebarItem,
	ConversationSideBarStyle,
} from '../styles'
import s from './index.module.scss'

type Props = {
	conversations: ConversationType[]
}

const ConversationSideBar: FC<Props> = ({ conversations }) => {
	return (
		<ConversationSideBarStyle>
			<ConversationSidebarHeader>
				<h1>Conversation</h1>
				<TbEdit size={40} />
			</ConversationSidebarHeader>
			<ConversationSidebarContainer>
				{conversations.map(conversation => {
					return (
						<ConversationSidebarItem key={conversation.id}>
							<div className={s.conversationAvatar}></div>
							<div>
								<span className={s.conversationName}>{conversation.name}</span>
								<span className={s.conversationLastMessage}>
									{conversation.lastMessage}
								</span>
							</div>
						</ConversationSidebarItem>
					)
				})}
			</ConversationSidebarContainer>
		</ConversationSideBarStyle>
	)
}

export default ConversationSideBar
