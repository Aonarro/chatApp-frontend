import { useContext } from 'react';
import { MenuContext } from '../utils/context/MenuContext';

export const useMessageMenuContext = () => {
	const { message } = useContext(MenuContext);
	return {
		message,
	};
};
