import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '../utils/types.ts';


interface IConversationsState {
	conversations: Conversation[];
}


const initialState: IConversationsState = {
	conversations: [],
};

export const conversationsSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		addConversation: (state, action: PayloadAction<Conversation>) => {
			state.conversations.push(action.payload);
		},
	},
});

export const { addConversation } = conversationsSlice.actions;


// export const selectCount = (state: RootState) => state.counter.value

export default conversationsSlice.reducer;