import { createAsyncThunk } from '@reduxjs/toolkit';
import { getConversations, postNewConversation } from '../../axios/api.ts';
import { CreateConversationParams } from '../../utils/types.ts';

export const fetchConversationsThunk = createAsyncThunk('conversations/fetchConversations', async () => {
	try {
		const response = await getConversations();
		console.log(response);
		return response.data;
	} catch (err) {
		console.log(err);
	}
});

export const postNewConversationThunk = createAsyncThunk(
	'conversations/createNewConversation',
	async (params: CreateConversationParams) => {
		try {
			const response = await postNewConversation(params);
			console.log(response);
			return response.data;
		} catch (err) {
			console.log(err);
		}
	}
);
