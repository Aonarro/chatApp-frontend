import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import conversationsReducer from './conversations/conversationsSlice.ts';
import messagesSlice from './messages/messagesSlice.ts';

export const store = configureStore({
	reducer: {
		conversations: conversationsReducer,
		messages: messagesSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
