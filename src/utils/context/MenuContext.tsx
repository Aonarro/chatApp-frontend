import { createContext, Dispatch, SetStateAction } from 'react';
import { Message } from '../types';

type MenuContext = {
	message: Message | null;
	setMessage: Dispatch<SetStateAction<Message | null>>;
};

export const MenuContext = createContext<MenuContext>({
	message: null,
	setMessage: () => {},
});
