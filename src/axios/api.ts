import {
	Conversation,
	CreateConversationParams,
	CreateMessageParams,
	CreateUserParams,
	DeleteMessagePayload,
	DeleteMessageResponse,
	FetchMessagePayload,
	User,
	UserCredentialsParams,
} from '../utils/types.ts';
import { axiosClient, config } from './axios.ts';

export const postRegisterUser = (data: CreateUserParams) => axiosClient.post(`/auth/register`, data, config);

export const postLoginUser = (data: UserCredentialsParams) => axiosClient.post(`/auth/login`, data, config);

export const getUserAuthentication = () => axiosClient.get<User>(`/auth/status`, config);

export const getConversations = () => axiosClient.get<Conversation[]>(`/conversations`, config);

export const getConversationMessages = (conversationId: number) =>
	axiosClient.get<FetchMessagePayload>(`/conversations/${conversationId}/messages`, config);

export const postMessage = (id: number, data: CreateMessageParams) =>
	axiosClient.post(`/conversations/${id}/messages`, data, config);

export const postNewConversation = (data: CreateConversationParams) =>
	axiosClient.post<Conversation>('/conversations', data, config);

export const deleteMessage = (data: DeleteMessagePayload) =>
	axiosClient.delete<DeleteMessageResponse>(`/conversations/${data.conversationId}/messages/${data.messageId}`, config);
