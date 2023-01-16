/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	channels: [],
	messages: [],
	currentChannelId: 1,
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		getChannels: (state, action) => {
			state.channels = action.payload.channels;
			state.messages = action.payload.messages;
			state.currentChannelId = action.payload.currentChannelId;
		},
		addMessages: (state, action) => {
			state.messages.push(action.payload);
		},
		setChannel: (state, action) => {
			state.currentChannelId = action.payload;
		},
		addChannel: (state, action) => {
			state.channels.push(action.payload);
		},
		deleteChannel: (state, action) => {
			// delete channel
			state.channels = state.channels.filter((c) => c.id !== action.payload.id);

			// delete messages
			state.messages = state.messages.filter((m) => m.channelId !== action.payload.id);
		},
		renameChannel: (state, action) => {
			state.channels = state.channels.map((c) => {
				if (c.id === action.payload.id) {
					return { ...c, name: action.payload.name };
				}
				return { ...c };
			});
		},
	},
});

export const { getChannels, addMessages, setChannel, addChannel, deleteChannel, renameChannel } =
	chatSlice.actions;

export default chatSlice.reducer;
