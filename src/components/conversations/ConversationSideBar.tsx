import { FC, useContext, useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { Conversation } from '../../utils/types';
import {
	ConversationSidebarContainer,
	ConversationSidebarHeader,
	ConversationSidebarItem,
	ConversationSideBarStyle,
} from '../styles';
import s from './index.module.scss';
import CreateConversationModal from '../modals/CreateConversationModal/CreateConversationModal.tsx';
import { AuthContext } from '../../utils/context/AuthContext.tsx';
import { useConversations } from '../../hooks/useConversations.ts';


const ConversationSideBar: FC = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { conversations } = useConversations();

	const toggleModalVisibility = () => {
		setIsModalOpen(!isModalOpen);
	};

	const getDisplayUser = (conversation: Conversation) => {
		return conversation.creator.id === user?.id ? conversation.recipient : conversation.creator;
	};

	return (
		<>
			{<CreateConversationModal isOpen={isModalOpen} onClose={toggleModalVisibility} />}
			<ConversationSideBarStyle>
				<ConversationSidebarHeader>
					<h1>Conversation</h1>
					<div onClick={toggleModalVisibility}>
						<TbEdit size={40} className={s.createConversationBtn} />
					</div>
				</ConversationSidebarHeader>
				<ConversationSidebarContainer>
					{conversations.map((conversation) => {
						return (
							<ConversationSidebarItem
								key={conversation.id}
								onClick={() => navigate(`/conversations/${conversation.id}`)}
							>
								<div className={s.conversationAvatar}></div>
								<div>
									<span
										className={s.conversationName}>{`${getDisplayUser(conversation).firstName} ${getDisplayUser(conversation).lastName}`}</span>
									<span className={s.conversationLastMessage}>
									Test text adsdsa
								</span>
								</div>
							</ConversationSidebarItem>
						);
					})}
				</ConversationSidebarContainer>
			</ConversationSideBarStyle>
		</>
	);
};

export default ConversationSideBar;
