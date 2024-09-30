import {
	Conversation,
	CreateMessageParams,
	CreateUserParams,
	FetchMessagePayload,
	User,
	UserCredentialsParams,
} from '../utils/types.ts';
import { axiosClient, config } from './axios.ts';

export const postRegisterUser = (data: CreateUserParams) => axiosClient.post(`/auth/register`, data, config);

export const postLoginUser = (data: UserCredentialsParams) => axiosClient.post(`/auth/login`, data, config);

export const getUserAuthentication = () => axiosClient.get<User>(`/auth/status`, config);

export const getConversations = () => axiosClient.get<Conversation[]>(`/conversations`, config);

export const getConversationMessages = (id: number) => axiosClient.get<FetchMessagePayload>(`/messages/${id}`, config);

export const postMessage = (data: CreateMessageParams) => axiosClient.post('/messages', data, config);
