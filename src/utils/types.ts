
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
	createdAt: string
};

export type Message = {
	id: number;
	content: string;
	createdAt: string;
	author: User;
}

export type MessageEventPayload = {
	id: number;
	createdAt: string;
	conversation: Conversation;
	author: User;
	content: string;
}

export type CreateMessageParams = {
	content: string;
	conversationId: number
}
