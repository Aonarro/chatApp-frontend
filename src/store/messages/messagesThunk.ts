import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteMessage, getConversationMessages } from '../../axios/api.ts';
import { DeleteMessagePayload, DeleteMessageResponse } from '../../utils/types.ts';

export const fetchMessagesThunk = createAsyncThunk('messages/fetchMessages', async (conversationId: number) => {
	try {
		const response = await getConversationMessages(conversationId);
		return response.data;
	} catch (err) {
		console.log(err);
	}
});

export const deleteMessageThunk = createAsyncThunk('messages/deleteMessage', async (params: DeleteMessagePayload) => {
	try {
		const response = await deleteMessage(params);
		return response.data as DeleteMessageResponse;
	} catch (err) {
		console.log('Error in deleteMessageThunk:', err);
	}
});
