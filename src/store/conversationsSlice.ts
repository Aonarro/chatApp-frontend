import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '../utils/types.ts';
import { getConversations } from '../axios/api.ts';


interface IConversationsState {
	conversations: Conversation[];
	loading: boolean;
}


const initialState: IConversationsState = {
	conversations: [],
	loading: false,
};

export const fetchConversationsThunk = createAsyncThunk('conversations/fetchConversations', async () => {
	try {
		const response = await getConversations();
		console.log(response);
		return response.data;
	} catch (err) {
		console.log(err);
	}
});

export const conversationsSlice = createSlice({
	name: 'conversations',
	initialState,
	reducers: {
		addConversation: (state, action: PayloadAction<Conversation>) => {
			state.conversations.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchConversationsThunk.fulfilled, (state, action: PayloadAction<Conversation[] | undefined>) => {
			state.conversations = action.payload ?? [];
			state.loading = false;
		})
			.addCase(fetchConversationsThunk.pending, (state) => {
				state.loading = true;
			});
	},

});

export const { addConversation } = conversationsSlice.actions;


// export const selectCount = (state: RootState) => state.counter.value

export default conversationsSlice.reducer;