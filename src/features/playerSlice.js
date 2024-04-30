import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentTrack: "",
	isPlaying: false,
	currentTime: 0
}

export const playerSlice = createSlice({
	name: "player",
	initialState, 
	reducers: {
		playTrack(state, action){
			state.currentTrack = action.payload
			state.isPlaying = true
		},

		pausePlayback(state){
			state.isPlaying = false
		},

		resumePlayback(state){
			state.isPlaying = true
		},
		stopPlayback(state){
			state.currentTrack = null
			state.isPlaying = false
		},
		addTime(state){
			state.currentTime = state.currentTime + 1
		}
	}

})

export const { 
	playTrack, 
	pausePlayback, 
	resumePlayback, 
	stopPlayback,
	addTime
} = playerSlice.actions

export default playerSlice.reducer