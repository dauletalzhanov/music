import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentTrack: "",
	isPlaying: false,
	playingTime: 0
}

export const playerSlice = createSlice({
	name: "player",
	initialState, 
	reducers: {
		playTrack(state, action){
			state.currentTrack = action.payload
			state.isPlaying = true
			state.playingTime = 0
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
			state.playingTime = 0
		},
		addTime(state){
			state.playingTime = state.playingTime + 1
		},
		updateTime(state, action){
			state.playingTime = action.payload
		}
	}

})

export const { 
	playTrack, 
	pausePlayback, 
	resumePlayback, 
	stopPlayback,
	addTime,
	updateTime
} = playerSlice.actions

export default playerSlice.reducer