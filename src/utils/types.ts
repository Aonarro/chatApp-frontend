export type CreateUserParams = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
};

export type UserCredentialsParams = {
	email: string;
	password: string;
};

export type User = {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
};

export type Conversation = {
	id: number;
	creator: User;
	recipient: User;
	createdAt: string;
	lastMessageSent: Message;
};

export type Message = {
	id: number;
	content: string;
	createdAt: string;
	author: User;
};

export type MessageEventPayload = {
	message: Message;
	conversation: Conversation;
};

export type FetchMessagePayload = {
	id: number;
	messages: Message[];
};

export type ConversationMessage = {
	id: number;
	messages: Message[];
};

export type CreateMessageParams = {
	content: string;
	conversationId: number;
};

export type CreateConversationParams = {
	email: string;
	message: string;
};
