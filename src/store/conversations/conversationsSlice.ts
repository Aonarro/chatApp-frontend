import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '../../utils/types.ts';
import { RootState } from '../index.ts';
import { fetchConversationsThunk, postNewConversationThunk } from './conversationsThunk.ts';

interface IConversationsState {
	conversations: Conversation[];
	loading: boolean;
}

const initialState: IConversationsState = {
	conversations: [],
	loading: false,
};

export const conversationsSlice = createSlice({
	name: 'conversations',
	initialState,
	reducers: {
		addConversation: (state, action: PayloadAction<Conversation>) => {
			state.conversations.unshift(action.payload);
		},
		updateConversation: (state, action: PayloadAction<Conversation>) => {
			const conversation = action.payload;
			const index = state.conversations.findIndex((conv) => conv.id === conversation.id);
			state.conversations.splice(index, 1);
			state.conversations.unshift(conversation);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchConversationsThunk.fulfilled, (state, action: PayloadAction<Conversation[] | undefined>) => {
				state.conversations = action.payload ?? [];
				state.loading = false;
			})
			.addCase(fetchConversationsThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(postNewConversationThunk.fulfilled, (state, action: PayloadAction<Conversation | undefined>) => {
				if (action.payload) {
					const conversation = action.payload;
					state.conversations.unshift(conversation);
					console.log(action.payload);
				}
				state.loading = false;
			})
			.addCase(postNewConversationThunk.pending, (state) => {
				state.loading = true;
			});
	},
});

const selectConversations = (state: RootState) => state.conversations.conversations;
const selectConversationId = (state: RootState, id: number) => id;

export const selectConversationById = createSelector(
	[selectConversations, selectConversationId],
	(conversations, conversationId) => conversations.find((conversation) => conversation.id === conversationId)
);

export const { addConversation, updateConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
