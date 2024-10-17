import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '../../utils/types.ts';
import { fetchConversationsThunk } from './conversationsThunk.ts';

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
			state.conversations.push(action.payload);
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
			});
	},
});

export const { addConversation, updateConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
