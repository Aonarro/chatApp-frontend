import { createContext } from 'react';
import { User } from '../types';

type AuthContextType = {
	user?: User | undefined;
	updateAuthUser: (data: User | undefined) => void;
};

export const AuthContext = createContext<AuthContextType>({
	updateAuthUser: () => {},
});