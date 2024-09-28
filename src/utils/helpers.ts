import { format, isToday } from 'date-fns';


export const formatDate = (dateString: string) => {
	const date = new Date(dateString);

	if (isToday(date)) {
		return `Today at ${format(date, 'HH:mm')}`;
	} else {
		return `${format(date, 'dd.MM')} at ${format(date, 'HH:mm')}`;
	}
};