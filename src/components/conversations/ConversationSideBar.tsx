import { FC, useContext, useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/typedReduxHooks.ts';
import { AuthContext } from '../../utils/context/AuthContext.tsx';
import { Conversation } from '../../utils/types';
import CreateConversationModal from '../modals/CreateConversationModal/CreateConversationModal.tsx';
import {
	ConversationSidebarContainer,
	ConversationSidebarHeader,
	ConversationSidebarItem,
	ConversationSideBarStyle,
} from '../styles';
import s from './index.module.scss';

const ConversationSideBar: FC = () => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { conversations, loading } = useAppSelector((state) => state.conversations);

	const getDisplayUser = (conversation: Conversation) => {
		return conversation.creator.id === user?.id ? conversation.recipient : conversation.creator;
	};

	return (
		<>
			{<CreateConversationModal isOpen={isModalOpen} onClose={setIsModalOpen} />}
			<ConversationSideBarStyle>
				<ConversationSidebarHeader>
					<h1>Conversation</h1>
					<div onClick={() => setIsModalOpen(true)}>
						<TbEdit size={40} className={s.createConversationBtn} />
					</div>
				</ConversationSidebarHeader>
				<ConversationSidebarContainer>
					{loading ? (
						<div>loading...</div>
					) : (
						conversations.map((conversation) => {
							return (
								<ConversationSidebarItem
									key={conversation.id}
									onClick={() => navigate(`/conversations/${conversation.id}`)}
								>
									<div className={s.conversationAvatar}></div>
									<div>
										<span className={s.conversationName}>{`${getDisplayUser(conversation).firstName} ${
											getDisplayUser(conversation).lastName
										}`}</span>
										<span className={s.conversationLastMessage}>{conversation.lastMessageSent?.content}</span>
									</div>
								</ConversationSidebarItem>
							);
						})
					)}
				</ConversationSidebarContainer>
			</ConversationSideBarStyle>
		</>
	);
};

export default ConversationSideBar;
