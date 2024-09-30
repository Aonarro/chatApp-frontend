import { createAsyncThunk } from '@reduxjs/toolkit';
import { getConversations } from '../../axios/api.ts';

export const fetchConversationsThunk = createAsyncThunk('conversations/fetchConversations', async () => {
	try {
		const response = await getConversations();
		console.log(response);
		return response.data;
	} catch (err) {
		console.log(err);
	}
});