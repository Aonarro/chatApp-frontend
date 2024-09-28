import { useContext } from 'react';
import { AuthContext } from '../utils/context/AuthContext.tsx';


export const useAuthContext = () => {
	const {updateAuthUser, user} = useContext(AuthContext)

	return {updateAuthUser, user}
}