import { FC, useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { ConversationType } from '../../utils/types';
import {
	ConversationSidebarContainer,
	ConversationSidebarHeader,
	ConversationSidebarItem,
	ConversationSideBarStyle,
} from '../styles';
import s from './index.module.scss';
import CreateConversationModal from '../modals/CreateConversationModal/CreateConversationModal.tsx';

type Props = {
	conversations: ConversationType[]
}

const ConversationSideBar: FC<Props> = ({ conversations }) => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(true);

	const toggleModalVisibility = () => {
		setIsModalOpen(!isModalOpen)
	}

	return (
		<>
			{<CreateConversationModal isOpen={isModalOpen} onClose={toggleModalVisibility}/>}
			<ConversationSideBarStyle>
				<ConversationSidebarHeader>
					<h1>Conversation</h1>
					<div onClick={toggleModalVisibility}>
						<TbEdit size={40} className={s.createConversationBtn}/>
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
									<span className={s.conversationName}>{conversation.name}</span>
									<span className={s.conversationLastMessage}>
									{conversation.lastMessage}
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
