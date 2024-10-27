import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	ConversationMessage,
	DeleteMessageResponse,
	FetchMessagePayload,
	MessageEventPayload,
} from '../../utils/types.ts';
import { RootState } from '../index.ts';
import { deleteMessageThunk, fetchMessagesThunk } from './messagesThunk.ts';

interface IMessagesState {
	messages: ConversationMessage[];
	loading: boolean;
}

const initialState: IMessagesState = {
	messages: [],
	loading: false,
};

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
			const { conversation, message } = action.payload;
			const conversationMessages = state.messages.find(
				(conversationMessage) => conversationMessage.id === conversation.id
			);
			conversationMessages?.messages.unshift(message);
		},
		deleteMessage: (state, action: PayloadAction<DeleteMessageResponse>) => {
			console.log('Inside deleteMessage reducer');
			const { conversationId, messageId } = action.payload;
			const conversationMessages = state.messages.find(
				(conversationMessage) => conversationMessage.id === +conversationId
			);
			if (!conversationMessages) return;
			const messageIndex = conversationMessages.messages.findIndex((message) => message.id === +messageId);

			conversationMessages?.messages.splice(messageIndex, 1);
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(fetchMessagesThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchMessagesThunk.fulfilled, (state, action: PayloadAction<FetchMessagePayload | undefined>) => {
				if (action.payload) {
					console.log(action.payload);
					const { id } = action.payload;
					const index = state.messages.findIndex((conversationMessage) => conversationMessage.id === id);
					const exists = state.messages.find((conversationMessage) => conversationMessage.id === id);
					if (exists) {
						state.messages[index] = action.payload;
					} else {
						state.messages.push(action.payload);
					}
					state.loading = false;
				}
			})
			.addCase(deleteMessageThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteMessageThunk.fulfilled, (state, action: PayloadAction<DeleteMessageResponse | undefined>) => {
				if (action.payload) {
					const { conversationId, messageId } = action.payload;
					const conversationMessages = state.messages.find(
						(conversationMessage) => conversationMessage.id === +conversationId
					);
					if (!conversationMessages) return;
					const messageIndex = conversationMessages.messages.findIndex((message) => message.id === +messageId);

					conversationMessages?.messages.splice(messageIndex, 1);
					state.loading = false;
				}
			}),
});

const selectConversationMessages = (state: RootState) => state.messages.messages;

const selectConversationMessageId = (_state: RootState, id: number) => id;

export const selectConversationMessage = createSelector(
	[selectConversationMessages, selectConversationMessageId],
	(conversationMessages, id) => conversationMessages.find((convMessage) => convMessage.id === id)
);

export const { addMessage, deleteMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
