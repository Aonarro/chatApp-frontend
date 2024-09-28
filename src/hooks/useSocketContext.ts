import { useContext } from 'react';
import { SocketContext } from '../utils/context/SocketContext.tsx';


export const useSocketContext = () => {
	return useContext(SocketContext)
}