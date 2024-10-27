import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteMessage, getConversationMessages } from '../../axios/api.ts';
import { DeleteMessagePayload } from '../../utils/types.ts';

export const fetchMessagesThunk = createAsyncThunk('messages/fetchMessages', async (conversationId: number) => {
	try {
		const response = await getConversationMessages(conversationId);
		return response.data;
	} catch (err) {
		console.log(err);
	}
});

export const deleteMessageThunk = createAsyncThunk('messages/delete', async (params: DeleteMessagePayload) => {
	try {
		const response = await deleteMessage(params);
		return response.data;
	} catch (err) {
		console.log(err);
	}
});
