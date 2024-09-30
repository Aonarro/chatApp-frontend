import { configureStore } from '@reduxjs/toolkit'
import conversationsReducer from './conversations/conversationsSlice.ts'
import messagesSlice from './messages/messagesSlice.ts'

export const store = configureStore({
	reducer: {
		conversations: conversationsReducer,
		messages: messagesSlice
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch