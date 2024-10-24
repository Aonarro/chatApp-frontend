import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConversationMessage, FetchMessagePayload, MessageEventPayload } from '../../utils/types.ts';
import { RootState } from '../index.ts';
import { fetchMessagesThunk } from './messagesThunk.ts';

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
	},
	extraReducers: (builder) =>
		builder
			.addCase(fetchMessagesThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchMessagesThunk.fulfilled, (state, action: PayloadAction<FetchMessagePayload | undefined>) => {
				if (action.payload) {
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
				state.loading = false;
			}),
});

const selectConversationMessages = (state: RootState) => state.messages.messages;

const selectConversationMessageId = (state: RootState, id: number) => id;

export const selectConversationMessage = createSelector(
	[selectConversationMessages, selectConversationMessageId],
	(conversationMessages, id) => conversationMessages.find((convMessage) => convMessage.id === id)
);

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
