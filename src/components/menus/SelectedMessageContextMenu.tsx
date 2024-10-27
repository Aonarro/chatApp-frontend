import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/typedReduxHooks';
import { useMessageMenuContext } from '../../hooks/useMessageMenuContext';
import { deleteMessageThunk } from '../../store/messages/messagesThunk';
import { ContextMenuStyle } from '../styles';

type Props = {
	messagePoints: { x: number; y: number };
};

const SelectedMessageContextMenu: FC<Props> = ({ messagePoints }) => {
	const { message } = useMessageMenuContext();
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const deleteMessage = () => {
		console.log(`Delete message ${message?.id}`);
		if (!message) return;
		dispatch(deleteMessageThunk({ conversationId: +id!, messageId: message?.id }));
	};

	return (
		<ContextMenuStyle $top={messagePoints.y} $left={messagePoints.x}>
			<ul>
				<li onClick={deleteMessage}>Delete</li>
				<li>Edit</li>
			</ul>
		</ContextMenuStyle>
	);
};

export default SelectedMessageContextMenu;
