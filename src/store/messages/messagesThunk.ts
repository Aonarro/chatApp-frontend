import { createAsyncThunk } from '@reduxjs/toolkit';
import { getConversationMessages } from '../../axios/api.ts';

export const fetchMessagesThunk = createAsyncThunk('messages/fetchMessages', async (conversationId: number) => {
	try {
		const response = await getConversationMessages(conversationId);
		return response.data;
	} catch (err) {
		console.log(err);
	}
});
