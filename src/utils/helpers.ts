import { format, isToday } from 'date-fns';
import { Conversation, User } from './types';

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);

	if (isToday(date)) {
		return `Today at ${format(date, 'HH:mm')}`;
	} else {
		return `${format(date, 'dd.MM')} at ${format(date, 'HH:mm')}`;
	}
};

export const getRecipientFromConversation = (conversation?: Conversation, user?: User) => {
	return user?.id === conversation?.creator.id ? conversation?.recipient : conversation?.creator;
};
